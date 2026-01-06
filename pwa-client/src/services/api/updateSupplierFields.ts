import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/services/firebase';

export interface SupplierDeliveryTime {
  hour: number; // 0-23
  minute: number; // 0-59
}

export interface SupplierDelivery {
  dayOfWeek?: number; // ISO 8601: 1 (Monday) to 7 (Sunday)
  from?: SupplierDeliveryTime;
  to?: SupplierDeliveryTime;
}

export interface UpdateSupplierFieldsRequest {
  supplierId: string;
  fields: {
    name?: string;
    supplierCategory?: string;
    supplierTaxNumber?: string;
    delivery?: SupplierDelivery;
  };
}

export interface UpdateSupplierFieldsResponse {
  success: boolean;
  message?: string;
  updatedFields?: string[];
}

const endpoint = import.meta.env.VITE_UPDATE_SUPPLIER_FIELDS_ENDPOINT ?? '';
const auth = getAuth(firebaseApp);

export const updateSupplierFields = async (
  payload: UpdateSupplierFieldsRequest
): Promise<UpdateSupplierFieldsResponse> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Πρέπει να είστε συνδεδεμένος για να ενημερώσετε τον προμηθευτή');
  }

  if (!endpoint) {
    throw new Error('Το endpoint ενημέρωσης προμηθευτή δεν έχει ρυθμιστεί');
  }

  const token = await user.getIdToken();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message ?? 'Αποτυχία ενημέρωσης προμηθευτή');
  }

  return response.json();
};
