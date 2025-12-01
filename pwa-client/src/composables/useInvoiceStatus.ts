import { storeToRefs } from 'pinia';

import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { useInvoiceStore } from '@/store/invoiceStore';
import { useFirestore } from './useFirestore';

export function useInvoiceStatus() {
  const store = useInvoiceStore();
  const { invoices, activeInvoice } = storeToRefs(store);
  const { fetchInvoices, subscribeToInvoice } = useFirestore();

  const hydrate = async () => {
    if (store.initialized) return;
    const snapshot = await fetchInvoices();
    store.setInvoices(snapshot);
  };

  const watchInvoice = (id: string) => subscribeToInvoice(id, (invoice) => store.upsertInvoice(invoice));

  const getInvoiceById = (id: string) => store.invoices.find((invoice) => invoice.id === id) ?? null;
  const upsertInvoice = (invoice: Invoice) => store.upsertInvoice(invoice);
  const setActiveInvoice = (id: string | null) => store.setActiveInvoice(id);

  return {
    invoices,
    activeInvoice,
    hydrate,
    watchInvoice,
    setActiveInvoice,
    upsertInvoice,
    getInvoiceById,
  };
}
