<template>
  <section class="w-full">
    <header class="mb-6">
      <h2 class="text-2xl font-semibold text-slate-900">Τιμολόγια</h2>
      <p class="mt-1 text-sm text-slate-500">Αναζήτηση τιμολογίων ανά περίοδο</p>
    </header>

    <!-- Date Range Picker Card -->
    <div class="mb-8 rounded-3xl bg-white p-6 shadow-lg">
      <div class="mb-6">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-400">Επιλογή Περιόδου</h3>
      </div>

      <!-- Quick Period Buttons -->
      <div class="mb-6 flex flex-wrap gap-2">
        <button
          v-for="period in quickPeriods"
          :key="period.label"
          type="button"
          class="rounded-xl px-4 py-2.5 text-sm font-medium transition active:scale-95"
          :class="selectedPeriod === period.label
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          @click="selectQuickPeriod(period)"
        >
          {{ period.label }}
        </button>
      </div>

      <!-- Custom Date Range -->
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Από</label>
          <div class="relative">
            <input
              v-model="startDate"
              type="date"
              class="h-14 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
              @change="selectedPeriod = 'custom'"
            />
            <svg class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Έως</label>
          <div class="relative">
            <input
              v-model="endDate"
              type="date"
              class="h-14 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
              @change="selectedPeriod = 'custom'"
            />
            <svg class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Search Button -->
      <button
        type="button"
        :disabled="!isValidRange || loading"
        class="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary-600 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        @click="searchInvoices"
      >
        <svg v-if="loading" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {{ loading ? 'Αναζήτηση...' : 'Αναζήτηση Τιμολογίων' }}
      </button>
    </div>

    <!-- Results Section -->
    <div v-if="hasSearched" class="rounded-3xl bg-white p-6 shadow-lg">
      <header class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-slate-900">Αποτελέσματα</h3>
        <p class="text-sm text-slate-500">
          {{ invoices.length }} {{ invoices.length === 1 ? 'τιμολόγιο' : 'τιμολόγια' }}
        </p>
      </header>

      <Loader v-if="loading" label="Αναζήτηση τιμολογίων..." />
      
      <p v-else-if="error" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
        {{ error }}
      </p>

      <div v-else-if="invoices.length > 0" class="space-y-3">
        <article
          v-for="invoice in invoices"
          :key="invoice.id"
          class="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-slate-100"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-slate-900">{{ invoice.supplierName }}</p>
              <p class="text-sm text-slate-500">ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.id }}</p>
              <p class="mt-1 text-xs text-slate-400">{{ formatInvoiceDate(invoice.invoiceDate) }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-slate-900">€ {{ formatCurrency(invoice.totalAmount) }}</p>
              <StatusBadge :status="invoice.paymentStatus ?? invoice.status" />
            </div>
          </div>
        </article>
      </div>

      <p v-else class="py-8 text-center text-sm text-slate-500">
        Δεν βρέθηκαν τιμολόγια για την επιλεγμένη περίοδο.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Loader from '@/components/Loader.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { useFirestore } from '@/composables/useFirestore';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { formatCurrency, formatDateTime } from '@/utils/date';

const { fetchInvoicesByDateRange } = useFirestore();

const startDate = ref('');
const endDate = ref('');
const selectedPeriod = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const invoices = ref<Invoice[]>([]);
const hasSearched = ref(false);

const quickPeriods = [
  { label: 'Σήμερα', days: 0 },
  { label: 'Τελευταίες 7 ημέρες', days: 7 },
  { label: 'Τελευταίες 30 ημέρες', days: 30 },
  { label: 'Τελευταίες 90 ημέρες', days: 90 }
];

const isValidRange = computed(() => {
  return startDate.value && endDate.value && new Date(startDate.value) <= new Date(endDate.value);
});

const formatInvoiceDate = (date?: string | Date | { seconds: number }) => {
  return formatDateTime(date);
};

const selectQuickPeriod = (period: { label: string; days: number }) => {
  selectedPeriod.value = period.label;
  const today = new Date();
  endDate.value = today.toISOString().split('T')[0];

  if (period.days === -1) {
    // Current year
    startDate.value = `${today.getFullYear()}-01-01`;
  } else if (period.days === 0) {
    // Today
    startDate.value = endDate.value;
  } else {
    const start = new Date(today);
    start.setDate(start.getDate() - period.days);
    startDate.value = start.toISOString().split('T')[0];
  }
};

const searchInvoices = async () => {
  if (!isValidRange.value) return;

  loading.value = true;
  error.value = null;
  hasSearched.value = true;

  try {
    const start = new Date(startDate.value);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate.value);
    end.setHours(23, 59, 59, 999);

    invoices.value = await fetchInvoicesByDateRange(start, end);
  } catch (err) {
    console.error('Failed to fetch invoices:', err);
    error.value = err instanceof Error ? err.message : 'Αδυναμία φόρτωσης τιμολογίων';
  } finally {
    loading.value = false;
  }
};
</script>

