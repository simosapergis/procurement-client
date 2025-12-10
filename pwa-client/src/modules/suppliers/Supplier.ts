export type SupplierStatus = 'active' | 'inactive' | 'prospect';

export interface Supplier {
  id: string;
  name: string;
  contactEmail?: string;
  contactPhone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  status?: SupplierStatus;
  updatedAt?: string;
}




