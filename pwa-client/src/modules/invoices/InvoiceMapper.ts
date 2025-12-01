export type InvoiceStatus = 'pending' | 'processing' | 'uploaded' | 'failed';

export interface InvoiceQuality {
  score: number;
  accepted: boolean;
  reasons: string[];
}

export interface Invoice {
  id: string;
  supplierName: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  statusMessage: string;
  uploadedAt: string;
  quality: InvoiceQuality;
  fileUrl: string;
}

export interface InvoicePayload extends Partial<Invoice> {
  id: string;
}

export const mapInvoice = (payload: InvoicePayload): Invoice => ({
  id: payload.id,
  supplierName: payload.supplierName ?? 'Unknown supplier',
  amount: payload.amount ?? 0,
  currency: payload.currency ?? 'USD',
  status: payload.status ?? 'processing',
  statusMessage: payload.statusMessage ?? 'Queued for extraction',
  uploadedAt: payload.uploadedAt ?? new Date().toISOString(),
  quality: payload.quality ?? { score: 0, accepted: false, reasons: [] },
  fileUrl: payload.fileUrl ?? '',
});
