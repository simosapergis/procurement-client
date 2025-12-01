<template>
  <article
    class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    @click="handleClick"
  >
    <header class="flex items-center justify-between">
      <h3 class="text-base font-semibold text-slate-900">{{ props.invoice.supplierName }}</h3>
      <StatusBadge :status="props.invoice.status" />
    </header>
    <p class="mt-2 text-sm text-slate-500">Invoice ID: {{ props.invoice.id }}</p>
    <p class="text-sm text-slate-500">Uploaded: {{ formattedDate }}</p>
    <p class="mt-2 text-lg font-semibold text-slate-900">{{ props.invoice.currency }} {{ props.invoice.amount.toFixed(2) }}</p>
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

const formattedDate = computed(() => formatDateTime(props.invoice.uploadedAt));

const handleClick = () => emit('select', props.invoice.id);
</script>
