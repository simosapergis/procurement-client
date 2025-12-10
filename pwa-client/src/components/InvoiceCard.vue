<template>
  <article
    class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    @click="handleClick"
  >
    <header class="flex items-center justify-between">
      <h3 class="text-base font-semibold text-slate-900">{{ props.invoice.supplierName }}</h3>
      <StatusBadge :status="props.invoice.paymentStatus" />
    </header>
    <p class="mt-2 text-sm text-slate-500">
      Invoice {{ props.invoice.invoiceNumber ?? props.invoice.invoiceId ?? props.invoice.id }}
    </p>
    <p class="text-sm text-slate-500">
      Uploaded: {{ formattedDate }}
    </p>
    <p class="text-xs text-slate-400">
      Invoice Date: {{ invoiceDate }}
    </p>
    <p class="mt-2 text-lg font-semibold text-slate-900">
      {{ props.invoice.currency }} {{ totalAmount }}
    </p>
    <footer class="mt-4 flex items-center justify-between text-xs text-slate-400">
      <span>Quality score: {{ props.invoice.quality.score }}</span>
      <span>{{ props.invoice.statusMessage }}</span>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import StatusBadge from './StatusBadge.vue';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { formatDateTime } from '@/utils/date';

const props = defineProps<{ invoice: Invoice }>();
const emit = defineEmits<{ (e: 'select', invoiceId: string): void }>();

const formattedDate = computed(() => formatDateTime(props.invoice.uploadedAt ?? props.invoice.processedAt));
const invoiceDate = computed(() => formatDateTime(props.invoice.invoiceDate));
const totalAmount = computed(() => (props.invoice.totalAmount ?? 0).toFixed(2));
const handleClick = () => emit('select', props.invoice.id);
</script>
