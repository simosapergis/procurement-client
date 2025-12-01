import type { Invoice, InvoiceQuality } from './InvoiceMapper';
import { mapInvoice } from './InvoiceMapper';
import { extractFileExtension } from '@/utils/file';

interface UploadDependencies {
  detectQuality: (file: File) => Promise<InvoiceQuality>;
  generateInvoiceId: () => string;
  detectSupplier: (file: File) => Promise<{
    name: string;
    amountHint?: number;
    currency?: string;
  } | null>;
  mapInvoice: typeof mapInvoice;
  requestSignedUrl: (payload: { filename: string; contentType: string; folder?: string }) => Promise<{
    uploadUrl: string;
    fileUrl: string;
    headers?: Record<string, string>;
  }>;
}

export class UploadFlow {
  constructor(private readonly deps: UploadDependencies) {}

  async run(file: File, onProgress?: (progress: number) => void): Promise<Invoice> {
    onProgress?.(10);
    const quality = await this.deps.detectQuality(file);
    if (!quality.accepted) {
      throw new Error(quality.reasons[0] ?? 'Quality check failed');
    }

    onProgress?.(30);
    const invoiceId = this.deps.generateInvoiceId();
    const extension = extractFileExtension(file.name) || 'jpg';
    const filename = `${invoiceId}.${extension}`;
    const signed = await this.deps.requestSignedUrl({
      filename,
      contentType: file.type || 'image/jpeg',
    });

    onProgress?.(60);
    const uploadResponse = await fetch(signed.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
        ...(signed.headers ?? {}),
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload to signed URL failed');
    }

    onProgress?.(85);
    const supplier = await this.deps.detectSupplier(file);
    const invoice = this.deps.mapInvoice({
      id: invoiceId,
      supplierName: supplier?.name,
      amount: supplier?.amountHint ?? 0,
      currency: supplier?.currency ?? 'USD',
      quality,
      status: 'processing',
      statusMessage: 'Uploaded and waiting for processing',
      fileUrl: signed.fileUrl,
    });

    onProgress?.(100);
    return invoice;
  }
}
