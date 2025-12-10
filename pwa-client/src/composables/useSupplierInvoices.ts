import { ref } from 'vue';

import { useFirestore } from './useFirestore';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';

export function useSupplierInvoices() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const invoices = ref<Invoice[]>([]);

  const { fetchSupplierInvoices } = useFirestore();

  const loadInvoices = async (supplierId: string) => {
    loading.value = true;
    error.value = null;
    try {
      invoices.value = await fetchSupplierInvoices(supplierId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load invoices';
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { invoices, loading, error, loadInvoices };
}


