<template>
  <section class="w-full">
    <header class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-slate-900">Invoices</h2>
      <RouterLink
        to="/upload"
        class="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
      >
        New upload
      </RouterLink>
    </header>
    <Loader v-if="loading" label="Syncing invoices..." />
    <div v-else class="grid gap-4 md:grid-cols-2">
      <InvoiceCard
        v-for="invoice in invoices"
        :key="invoice.id"
        :invoice="invoice"
        @select="openInvoice"
      />
    </div>
    <p
      v-if="!loading && invoices.length === 0"
      class="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500"
    >
      No invoices yet. Start by uploading your first invoice photo.
    </p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import InvoiceCard from '@/components/InvoiceCard.vue';
import Loader from '@/components/Loader.vue';
import { useInvoiceStatus } from '@/composables/useInvoiceStatus';

const router = useRouter();
const { invoices, hydrate } = useInvoiceStatus();
const loading = ref(true);

onMounted(async () => {
  await hydrate();
  loading.value = false;
});

const openInvoice = (id: string) => {
  router.push({ name: 'invoice-details', params: { id } });
};
</script>

