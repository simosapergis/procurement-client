<template>
  <section class="w-full">
    <header class="mb-6">
      <p class="text-xs uppercase tracking-wide text-primary-600">Dashboard</p>
      <h2 class="text-2xl font-semibold text-slate-900">Επισκόπηση</h2>
      <p class="mt-1 text-sm text-slate-500">Ανεξόφλητα και μερικώς εξοφλημένα τιμολόγια</p>
    </header>

    <div class="mb-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wide text-slate-400">Σύνολο τιμολογίων</p>
        <p class="mt-1 text-3xl font-bold text-slate-900">{{ invoices.length }}</p>
      </div>
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wide text-slate-400">Συνολικό ποσό</p>
        <p class="mt-1 text-3xl font-bold text-slate-900">€ {{ totalAmount }}</p>
      </div>
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wide text-slate-400">Ανεξόφλητο ποσό</p>
        <p class="mt-1 text-3xl font-bold text-amber-600">€ {{ totalUnpaid }}</p>
      </div>
    </div>

    <Loader v-if="loading" label="Φόρτωση τιμολογίων..." />
    <p v-else-if="error" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
      {{ error }}
    </p>

    <div v-else class="space-y-4">
      <article
        v-for="invoice in invoices"
        :key="invoice.id"
        class="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
      >
        <div class="flex-1">
          <p class="text-sm font-semibold text-slate-900">
            {{ invoice.supplierName }}
          </p>
          <p class="text-xs text-slate-500">
            {{ invoice.invoiceNumber ?? invoice.id }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm font-semibold text-slate-900">
            {{ invoice.currency ?? 'EUR' }} {{ (invoice.totalAmount ?? 0).toFixed(2) }}
          </p>
          <p class="text-xs" :class="invoice.unpaidAmount ? 'text-amber-600' : 'text-emerald-600'">
            Ανεξόφλητο: {{ invoice.currency ?? 'EUR' }} {{ (invoice.unpaidAmount ?? 0).toFixed(2) }}
          </p>
        </div>
        <StatusBadge class="ml-4" :status="invoice.paymentStatus ?? invoice.status" />
      </article>
    </div>

    <p v-if="!loading && invoices.length === 0" class="mt-4 text-sm text-slate-500">
      Δεν βρέθηκαν ανεξόφλητα τιμολόγια.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import Loader from '@/components/Loader.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { useFirestore } from '@/composables/useFirestore';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';

const { fetchUnpaidInvoices } = useFirestore();

const invoices = ref<Invoice[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const totalAmount = computed(() =>
  invoices.value.reduce((sum, inv) => sum + (inv.totalAmount ?? 0), 0).toFixed(2)
);

const totalUnpaid = computed(() =>
  invoices.value.reduce((sum, inv) => sum + (inv.unpaidAmount ?? 0), 0).toFixed(2)
);

onMounted(async () => {
  try {
    invoices.value = await fetchUnpaidInvoices();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Αδυναμία φόρτωσης τιμολογίων';
  } finally {
    loading.value = false;
  }
});
</script>

