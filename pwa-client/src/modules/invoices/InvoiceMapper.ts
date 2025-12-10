export type InvoiceStatus = 'pending' | 'processing' | 'uploaded' | 'completed' | 'failed';

export interface InvoiceQuality {
  score: number;
  accepted: boolean;
  reasons: string[];
}

export interface Invoice {
  id: string;
  invoiceId?: string;
  supplierId?: string;
  supplierName: string;
  supplierTaxNumber?: string;
  supplierNameNormalized?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  totalAmount?: number;
  netAmount?: number;
  vatAmount?: number;
  vatRate?: number;
  currency: string;
  status: InvoiceStatus;
  statusMessage?: string;
  errorMessage?: string | null;
  confidence?: number | null;
  uploadedAt: string;
  createdAt?: string;
  processedAt?: string;
  uploadedBy?: string;
  bucket?: string;
  rawFilePaths?: string[];
  filePath?: string;
  fileUrl?: string;
  quality: InvoiceQuality;
}

export interface InvoicePayload extends Partial<Invoice> {
  id: string;
}

export const mapInvoice = (payload: InvoicePayload): Invoice => ({
  id: payload.id,
  invoiceId: payload.invoiceId ?? payload.id,
  supplierId: payload.supplierId,
  supplierName: payload.supplierName ?? 'Unknown supplier',
  supplierTaxNumber: payload.supplierTaxNumber,
  supplierNameNormalized: payload.supplierNameNormalized,
  invoiceNumber: payload.invoiceNumber,
  invoiceDate: payload.invoiceDate,
  dueDate: payload.dueDate,
  totalAmount: payload.totalAmount ?? payload.amount ?? 0,
  netAmount: payload.netAmount,
  vatAmount: payload.vatAmount,
  vatRate: payload.vatRate,
  currency: payload.currency ?? 'USD',
  uploadedBy: payload.uploadedBy,
  bucket: payload.bucket,
  rawFilePaths: payload.rawFilePaths ?? [],
  filePath: payload.filePath,
  status: payload.status ?? 'processing',
  statusMessage: payload.statusMessage ?? payload.errorMessage ?? 'Queued for extraction',
  errorMessage: payload.errorMessage ?? null,
  confidence: payload.confidence ?? null,
  uploadedAt: payload.uploadedAt ?? new Date().toISOString(),
  createdAt: payload.createdAt,
  processedAt: payload.processedAt,
  quality: payload.quality ?? { score: 0, accepted: false, reasons: [] },
  fileUrl: payload.fileUrl,
});
