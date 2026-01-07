import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/services/firebase';

export interface UpdateInvoiceFieldsRequest {
  supplierId: string;
  invoiceId: string;
  fields: {
    supplierName?: string;
    supplierTaxNumber?: string;
    invoiceNumber?: string;
    invoiceDate?: string; // ISO date string
    dueDate?: string; // ISO date string
    totalAmount?: number;
    netAmount?: number;
    vatAmount?: number;
    vatRate?: number;
    currency?: string;
    paidAmount?: number; // Will recalculate unpaidAmount & paymentStatus
  };
}

export interface UpdateInvoiceFieldsResponse {
  success: boolean;
  message?: string;
  updatedFields?: string[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL ?? '';
const UPDATE_INVOICE_FIELDS_PATH = import.meta.env.VITE_UPDATE_INVOICE_FIELDS_PATH ?? 'updateInvoiceFields';
const auth = getAuth(firebaseApp);

export const updateInvoiceFields = async (
  payload: UpdateInvoiceFieldsRequest
): Promise<UpdateInvoiceFieldsResponse> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Πρέπει να είστε συνδεδεμένος για να ενημερώσετε το τιμολόγιο');
  }

  if (!BASE_URL) {
    throw new Error('Δεν έχει οριστεί το base URL για το API');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${BASE_URL}${UPDATE_INVOICE_FIELDS_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message ?? 'Αποτυχία ενημέρωσης τιμολογίου');
  }

  return response.json();
};


