<template>
  <article class="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg">
    <header class="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
      <div>
        <p class="text-xs uppercase tracking-widest text-primary-600">Invoice Details</p>
        <h3 class="text-2xl font-bold text-slate-900">
          {{ invoice.invoiceNumber ?? invoice.id }}
        </h3>
      </div>
      <button
        type="button"
        class="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        aria-label="Close"
        @click="$emit('close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </header>

    <dl class="grid gap-5 sm:grid-cols-2">
      <div class="rounded-xl bg-white p-4 shadow-sm">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Supplier</dt>
        <dd class="mt-1 text-lg font-semibold text-slate-900">
          {{ invoice.supplierName ?? '—' }}
        </dd>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Invoice Number</dt>
        <dd class="mt-1 text-lg font-semibold text-slate-900">
          {{ invoice.invoiceNumber ?? '—' }}
        </dd>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Uploaded At</dt>
        <dd class="mt-1 text-lg font-semibold text-slate-900">
          {{ formattedUploadedAt }}
        </dd>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Total Amount</dt>
        <dd class="mt-1 text-lg font-semibold text-slate-900">
          {{ invoice.currency ?? 'EUR' }} {{ formattedTotal }}
        </dd>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Unpaid Amount</dt>
        <dd class="mt-1 text-lg font-semibold" :class="unpaidColor">
          {{ invoice.currency ?? 'EUR' }} {{ formattedUnpaid }}
        </dd>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Net Amount</dt>
        <dd class="mt-1 text-lg font-semibold text-slate-900">
          {{ invoice.currency ?? 'EUR' }} {{ formattedNet }}
        </dd>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm sm:col-span-2">
        <dt class="text-xs uppercase tracking-wide text-slate-400">File Path</dt>
        <dd class="mt-1 truncate text-sm font-medium text-slate-700" :title="invoice.filePath">
          {{ invoice.filePath ?? '—' }}
        </dd>
      </div>
    </dl>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { formatDateTime } from '@/utils/date';

const props = defineProps<{ invoice: Invoice }>();
defineEmits<{ (e: 'close'): void }>();

const formattedUploadedAt = computed(() => formatDateTime(props.invoice.uploadedAt));
const formattedTotal = computed(() => (props.invoice.totalAmount ?? 0).toFixed(2));
const formattedUnpaid = computed(() => (props.invoice.unpaidAmount ?? 0).toFixed(2));
const formattedNet = computed(() => (props.invoice.netAmount ?? 0).toFixed(2));

const unpaidColor = computed(() =>
  (props.invoice.unpaidAmount ?? 0) > 0 ? 'text-amber-600' : 'text-emerald-600'
);
</script>

