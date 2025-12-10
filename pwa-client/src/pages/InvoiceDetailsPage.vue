<template>
  <section v-if="invoice" class="w-full rounded-3xl bg-white p-6 shadow-lg">
    <header class="flex items-center justify-between">
      <div>
        <p class="text-xs uppercase tracking-wide text-slate-400">Invoice ID</p>
        <h2 class="text-2xl font-semibold text-slate-900">{{ invoice.id }}</h2>
      </div>
      <StatusBadge :status="invoice.status" />
    </header>
    <dl class="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <dt class="text-xs uppercase text-slate-400">Supplier</dt>
        <dd class="text-lg font-semibold text-slate-900">{{ invoice.supplierName }}</dd>
      </div>
      <div>
        <dt class="text-xs uppercase text-slate-400">Amount</dt>
        <dd class="text-lg font-semibold text-slate-900">{{ invoice.currency }} {{ invoice.amount.toFixed(2) }}</dd>
      </div>
      <div>
        <dt class="text-xs uppercase text-slate-400">Uploaded</dt>
        <dd class="text-lg font-semibold text-slate-900">{{ formattedDate }}</dd>
      </div>
      <div>
        <dt class="text-xs uppercase text-slate-400">Quality</dt>
        <dd class="text-lg font-semibold text-slate-900">Score {{ invoice.quality.score }}</dd>
      </div>
    </dl>
    <div class="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
      {{ invoice.statusMessage }}
    </div>
  </section>
  <p v-else class="text-slate-500">Invoice not found.</p>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import StatusBadge from '@/components/StatusBadge.vue';
import { formatDateTime } from '@/utils/date';
import { useInvoiceStatus } from '@/composables/useInvoiceStatus';

const route = useRoute();
const invoiceId = route.params.id as string;

const { getInvoiceById, watchInvoice } = useInvoiceStatus();
const invoice = computed(() => getInvoiceById(invoiceId));
const formattedDate = computed(() => formatDateTime(invoice.value?.uploadedAt ?? invoice.value?.processedAt));

const unsubscribe = watchInvoice(invoiceId);
onUnmounted(() => unsubscribe?.());
</script>
