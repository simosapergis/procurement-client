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
  unpaidAmount?: number;
  paidAmount?: number;
  netAmount?: number;
  vatAmount?: number;
  vatRate?: number;
  currency: string;
  status: InvoiceStatus;
  paymentStatus?: 'paid' | 'unpaid' | 'partially_paid';
  statusMessage?: string;
  errorMessage?: string | null;
  confidence?: number | null;
  uploadedAt: string;
  createdAt?: string;
  processedAt?: string;
  uploadedBy?: string;
  uploadedByName?: string;
  bucket?: string;
  rawFilePaths?: string[];
  filePath?: string;
  fileUrl?: string;
  quality: InvoiceQuality;
}

