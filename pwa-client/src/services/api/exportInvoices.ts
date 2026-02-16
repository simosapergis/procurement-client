import { getAuth } from 'firebase/auth';

import { firebaseApp } from '@/services/firebase';

export interface ExportInvoiceEntry {
  supplierId: string;
  invoiceId: string;
}

export interface ExportRequest {
  invoices: ExportInvoiceEntry[];
}

export interface ExportResponseData {
  downloadUrl: string;
  invoiceCount: number;
  zipPath: string;
  expiresAt: string;
}

export interface ExportResponse {
  success: boolean;
  message: string;
  data: ExportResponseData;
}

export interface ExportErrorResponse {
  error: string;
  details?: string | string[];
  code?: string;
}

export class ExportError extends Error {
  details: string[];
  code?: string;

  constructor(message: string, details: string[] = [], code?: string) {
    super(message);
    this.name = 'ExportError';
    this.details = details;
    this.code = code;
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL ?? '';
const EXPORT_INVOICES_PATH = import.meta.env.VITE_EXPORT_INVOICES_PATH ?? '/exportInvoices_v2';
const auth = getAuth(firebaseApp);

export const exportInvoices = async (payload: ExportRequest): Promise<ExportResponse> => {
  const user = auth.currentUser;
  if (!user) {
    throw new ExportError('Πρέπει να είστε συνδεδεμένοι για να εξάγετε τιμολόγια');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${BASE_URL}${EXPORT_INVOICES_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: ExportErrorResponse = await response.json().catch(() => ({
      error: 'Αποτυχία εξαγωγής τιμολογίων',
    }));
    const details = Array.isArray(errorData.details)
      ? errorData.details
      : errorData.details
        ? [errorData.details]
        : [];
    throw new ExportError(
      errorData.error ?? 'Αποτυχία εξαγωγής τιμολογίων',
      details,
      errorData.code,
    );
  }

  return response.json();
};
