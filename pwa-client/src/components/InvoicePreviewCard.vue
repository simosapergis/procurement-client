<template>
  <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <header class="flex items-center justify-between">
      <div>
        <p class="text-xs uppercase tracking-wide text-slate-400">Invoice</p>
        <h3 class="text-base font-semibold text-slate-900">
          {{ invoice.invoiceNumber ?? invoice.invoiceId ?? invoice.id }}
        </h3>
      </div>
      <StatusBadge :status="invoice.paymentStatus" />
    </header>
    <p class="mt-3 text-sm text-slate-500">
      {{ invoice.currency }} {{ totalAmount }}
    </p>
    <p class="text-xs text-slate-400">Invoice date {{ invoiceDate }}</p>
    <p class="text-xs text-slate-400">Uploaded {{ formattedDate }}</p>
    <p class="mt-2 text-sm text-slate-500 line-clamp-2">
      {{ invoice.statusMessage ?? invoice.errorMessage ?? 'Processed invoice' }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import StatusBadge from '@/components/StatusBadge.vue';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { formatDateTime } from '@/utils/date';

const props = defineProps<{ invoice: Invoice }>();
const formattedDate = computed(() => formatDateTime(props.invoice.uploadedAt));
const invoiceDate = computed(() => formatDateTime(props.invoice.invoiceDate));
const totalAmount = computed(() => (props.invoice.totalAmount ?? 0).toFixed(2));
</script>


