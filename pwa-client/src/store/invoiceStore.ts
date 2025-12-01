import { defineStore } from 'pinia';

import type { Invoice } from '@/modules/invoices/InvoiceMapper';

export const useInvoiceStore = defineStore('invoices', {
  state: () => ({
    invoices: [] as Invoice[],
    activeInvoiceId: null as string | null,
    initialized: false,
  }),
  getters: {
    activeInvoice: (state) => state.invoices.find((invoice) => invoice.id === state.activeInvoiceId) ?? null,
  },
  actions: {
    setInvoices(invoices: Invoice[]) {
      this.invoices = invoices;
      this.initialized = true;
    },
    upsertInvoice(invoice: Invoice) {
      const index = this.invoices.findIndex((existing) => existing.id === invoice.id);
      if (index > -1) {
        this.invoices.splice(index, 1, invoice);
      } else {
        this.invoices.unshift(invoice);
      }
    },
    setActiveInvoice(id: string | null) {
      this.activeInvoiceId = id;
    },
  },
});
