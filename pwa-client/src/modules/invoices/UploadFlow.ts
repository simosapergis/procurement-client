import type { SignedUrlResponse } from '@/services/api/requestSignedUrl';
import type { ImageQualityReport } from '@/utils/image';
import { extractFileExtension } from '@/utils/file';
import { createUUID } from '@/utils/uuid';

interface UploadDependencies {
  detectQuality: (file: File) => Promise<ImageQualityReport>;
  requestSignedUrl: (payload: {
    filename: string;
    contentType: string;
    pageNumber: number;
    totalPages?: number;
    invoiceId?: string;
    folder?: string;
  }) => Promise<SignedUrlResponse>;
}

export interface UploadPageInput {
  file: File;
  pageNumber: number;
  totalPages?: number;
  invoiceId?: string;
  quality?: ImageQualityReport;
  onProgress?: (progress: number) => void;
}

export interface UploadPageResult {
  invoiceId: string;
  pageNumber: number;
  totalPages?: number;
  bucket?: string;
  objectName?: string;
  fileUrl: string;
  expiresAt?: string;
  quality: ImageQualityReport;
}

export class UploadFlow {
  constructor(private readonly deps: UploadDependencies) {}

async uploadPage(options: UploadPageInput): Promise<UploadPageResult> {
    const { file, pageNumber, totalPages, invoiceId, onProgress } = options;

    onProgress?.(5);
    const quality =
      options.quality ??
      (await this.deps.detectQuality(file).catch((error) => {
        throw error instanceof Error ? error : new Error('Quality check failed');
      }));

    if (!quality.accepted) {
      throw new Error(quality.reasons[0] ?? 'Quality check failed');
    }

    onProgress?.(35);
    const extension = extractFileExtension(file.name) || 'jpg';
    const filename = `${Date.now()}-${pageNumber}-${createUUID()}.${extension}`;

    console.info('[UploadFlow] quality ok', { pageNumber, totalPages, invoiceId, filename, type: file.type, size: file.size });
    const signed = await this.deps.requestSignedUrl({
      filename,
      contentType: file.type || 'image/jpeg',
      pageNumber,
      ...(typeof totalPages === 'number' ? { totalPages } : {}),
      ...(invoiceId ? { invoiceId } : {}),
    });

    onProgress?.(70);
    const uploadResponse = await fetch(signed.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || 'image/jpeg',
        ...(signed.headers ?? {}),
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      const body = await uploadResponse.text().catch(() => '');
      throw new Error(
        `Upload to signed URL failed (${uploadResponse.status} ${uploadResponse.statusText}) ${
          body ? `- ${body.slice(0, 200)}` : ''
        }`
      );
    }

    onProgress?.(100);

    return {
      invoiceId: signed.invoiceId,
      pageNumber: signed.pageNumber ?? pageNumber,
      totalPages: signed.totalPages ?? totalPages,
      bucket: signed.bucket,
      objectName: signed.objectName,
      fileUrl: signed.fileUrl,
      expiresAt: signed.expiresAt,
      quality,
    };
  }
}
