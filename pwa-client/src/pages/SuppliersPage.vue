<template>
  <section class="w-full">
    <header class="mb-6 flex items-center justify-between">
      <div>
        <p class="text-xs uppercase tracking-wide text-primary-600">Directory</p>
        <h2 class="text-2xl font-semibold text-slate-900">Suppliers</h2>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          :disabled="loading"
          @click="refresh"
        >
          Refresh
        </button>
        <button
          v-if="activeSupplierId"
          type="button"
          class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          :disabled="invoiceLoading"
          @click="clearSelection"
        >
          Clear
        </button>
      </div>
    </header>
    <Loader v-if="loading" label="Loading suppliers..." />
    <p v-else-if="error" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
      {{ error }}
    </p>
    <div v-else class="grid gap-4 md:grid-cols-2">
      <button
        v-for="supplier in suppliers"
        :key="supplier.id"
        type="button"
        class="text-left transition hover:-translate-y-0.5"
        @click="selectSupplier(supplier.id)"
      >
        <SupplierCard :supplier="supplier" />
      </button>
    </div>
    <p v-if="!loading && suppliers.length === 0" class="mt-4 text-sm text-slate-500">
      No suppliers found yet.
    </p>

    <section v-if="activeSupplierId" class="mt-10 rounded-3xl bg-white p-6 shadow-lg">
      <header class="mb-4 flex items-center justify-between">
        <h3 class="text-xl font-semibold text-slate-900">Invoices</h3>
        <p class="text-sm text-slate-500">Showing latest uploads for this supplier</p>
      </header>
      <Loader v-if="invoiceLoading" label="Loading invoices..." />
      <p v-else-if="invoiceError" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
        {{ invoiceError }}
      </p>
      <div v-else class="grid gap-4 md:grid-cols-2">
        <InvoicePreviewCard
          v-for="invoice in supplierInvoices"
          :key="invoice.id"
          :invoice="invoice"
          @select="selectInvoice"
        />
      </div>
      <p v-if="!invoiceLoading && supplierInvoices.length === 0" class="mt-4 text-sm text-slate-500">
        No invoices found for this supplier.
      </p>

      <!-- Invoice Detail View -->
      <Loader v-if="detailLoading" class="mt-6" label="Loading invoice details..." />
      <InvoiceDetailView
        v-else-if="selectedInvoice"
        class="mt-6"
        :invoice="selectedInvoice"
        @close="clearInvoiceSelection"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import InvoiceDetailView from '@/components/InvoiceDetailView.vue';
import InvoicePreviewCard from '@/components/InvoicePreviewCard.vue';
import Loader from '@/components/Loader.vue';
import SupplierCard from '@/components/SupplierCard.vue';
import { useFirestore } from '@/composables/useFirestore';
import { useSupplierInvoices } from '@/composables/useSupplierInvoices';
import { useSuppliers } from '@/composables/useSuppliers';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';

const { suppliers, loading, error, hydrate } = useSuppliers();
const { invoices: supplierInvoices, loading: invoiceLoading, error: invoiceError, loadInvoices } =
  useSupplierInvoices();
const { fetchSupplierInvoice } = useFirestore();

const activeSupplierId = ref<string | null>(null);
const selectedInvoice = ref<Invoice | null>(null);
const detailLoading = ref(false);

onMounted(async () => {
  await hydrate();
});

const refresh = async () => {
  await hydrate(true);
  if (activeSupplierId.value) {
    await loadInvoices(activeSupplierId.value);
  }
};

const selectSupplier = async (supplierId: string) => {
  activeSupplierId.value = supplierId;
  await loadInvoices(supplierId);
};

const clearSelection = () => {
  activeSupplierId.value = null;
  supplierInvoices.value = [];
  selectedInvoice.value = null;
};

const selectInvoice = async (invoiceId: string) => {
  if (!activeSupplierId.value) return;
  detailLoading.value = true;
  selectedInvoice.value = null;
  try {
    selectedInvoice.value = await fetchSupplierInvoice(activeSupplierId.value, invoiceId);
  } catch (err) {
    console.error('[SuppliersPage] failed to fetch invoice', err);
  } finally {
    detailLoading.value = false;
  }
};

const clearInvoiceSelection = () => {
  selectedInvoice.value = null;
};
</script>



