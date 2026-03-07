<template>
  <section class="w-full">
    <header class="mb-6">
      <h2 class="text-2xl font-semibold text-slate-900">Έσοδα</h2>
      <p class="mt-1 text-sm text-slate-500">Καταχώρηση και αναζήτηση εσόδων</p>
    </header>

    <!-- Tab Navigation -->
    <div class="mb-6 flex gap-1 rounded-xl bg-slate-100 p-1">
      <button
        type="button"
        class="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition"
        :class="activeTab === 'entry' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        @click="activeTab = 'entry'"
      >
        Καταχώρηση
      </button>
      <button
        type="button"
        class="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition"
        :class="activeTab === 'search' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        @click="activeTab = 'search'"
      >
        Αναζήτηση
      </button>
    </div>

    <!-- Entry Tab -->
    <div v-if="activeTab === 'entry'" class="rounded-3xl bg-white p-6 shadow-lg">
      <h3 class="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-900">
        <PlusCircle class="h-5 w-5 text-emerald-600" />
        Κλείσιμο Ημέρας
      </h3>

      <!-- Date Selector -->
      <div class="mb-6">
        <label class="mb-2 block text-sm font-medium text-slate-700">Ημερομηνία</label>
        <input
          v-model="entryDate"
          type="date"
          class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
        />
      </div>

      <!-- Income Inputs -->
      <div class="space-y-4">
        <div class="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <Banknote class="h-5 w-5" />
          </div>
          <div class="flex-1">
            <label class="text-sm font-medium text-slate-700">Μετρητά</label>
            <input
              v-model.number="cashAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-lg font-semibold text-slate-900 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <span class="text-lg font-medium text-slate-400">€</span>
        </div>

        <div class="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <CreditCard class="h-5 w-5" />
          </div>
          <div class="flex-1">
            <label class="text-sm font-medium text-slate-700">Κάρτα</label>
            <input
              v-model.number="cardAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-lg font-semibold text-slate-900 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <span class="text-lg font-medium text-slate-400">€</span>
        </div>

        <div class="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <ClipboardList class="h-5 w-5" />
          </div>
          <div class="flex-1">
            <label class="text-sm font-medium text-slate-700">Άλλα Έσοδα</label>
            <input
              v-model.number="otherAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-lg font-semibold text-slate-900 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <span class="text-lg font-medium text-slate-400">€</span>
        </div>
      </div>

      <!-- Total -->
      <div class="mt-6 rounded-xl bg-emerald-50 p-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-emerald-700">ΣΥΝΟΛΟ</span>
          <span class="text-2xl font-bold text-emerald-700">€ {{ formatCurrency(totalIncome) }}</span>
        </div>
      </div>
      <!-- Πεδίο για σημειώσεις εσόδου -->
      <div class="mt-4">
        <label class="mb-2 block text-sm font-medium text-slate-700">Σημειώσεις (προαιρετικό)</label>
        <input
          v-model="incomeDescription"
          type="text"
          placeholder="Σημειώσεις..."
          class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
        />
      </div>
      <!-- Submit Button -->
      <button
        type="button"
        :disabled="totalIncome === 0 || isSubmitting"
        class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:shadow-xl hover:shadow-emerald-600/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        @click="submitIncome"
      >
        <Loader2 v-if="isSubmitting" class="h-5 w-5 animate-spin" />
        {{ isSubmitting ? 'Καταχώρηση...' : 'Καταχώρηση Εσόδων' }}
      </button>

      <!-- Success/Error Messages -->
      <p v-if="successMessage" class="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
        {{ errorMessage }}
      </p>
    </div>

    <!-- Search Tab -->
    <div v-if="activeTab === 'search'" class="space-y-6">
      <!-- Date Range Selector -->
      <div class="rounded-3xl bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">ΕΠΙΛΟΓΗ ΠΕΡΙΟΔΟΥ</h3>
        
        <!-- Quick Period Buttons -->
        <div class="mb-4 flex flex-wrap gap-2">
          <button
            v-for="period in quickPeriods"
            :key="period.label"
            type="button"
            class="rounded-xl px-3 py-2 text-sm font-medium transition active:scale-95"
            :class="selectedPeriod === period.label
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            @click="selectQuickPeriod(period)"
          >
            {{ period.label }}
          </button>
        </div>

        <!-- Custom Date Range -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">Από</label>
            <input
              v-model="searchStartDate"
              type="date"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
              @change="selectedPeriod = 'custom'"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">Έως</label>
            <input
              v-model="searchEndDate"
              type="date"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
              @change="selectedPeriod = 'custom'"
            />
          </div>
        </div>

        <!-- Search Button -->
        <button
          type="button"
          :disabled="!isValidRange || isSearching"
          class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:shadow-xl hover:shadow-emerald-600/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          @click="searchEntries"
        >
          <Loader2 v-if="isSearching" class="h-5 w-5 animate-spin" />
          <Search v-else class="h-5 w-5" />
          {{ isSearching ? 'Αναζήτηση...' : 'Αναζήτηση' }}
        </button>
      </div>

      <!-- Results -->
      <div v-if="hasSearched" class="rounded-3xl bg-white p-6 shadow-lg">
        <!-- Summary -->
        <div v-if="reportData" class="mb-6 rounded-xl bg-emerald-50 p-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-emerald-700">Σύνολο Εσόδων</span>
            <span class="text-2xl font-bold text-emerald-700">€ {{ formatCurrency(reportData.summary.totalIncome) }}</span>
          </div>
          <div class="mt-3 grid grid-cols-3 gap-2 text-sm">
            <div class="rounded-lg bg-white p-2 text-center">
              <p class="text-xs text-slate-400">Μετρητά</p>
              <p class="font-semibold text-slate-900">€ {{ formatCurrency(reportData.breakdown.income.cash_sales ?? 0) }}</p>
            </div>
            <div class="rounded-lg bg-white p-2 text-center">
              <p class="text-xs text-slate-400">Κάρτα</p>
              <p class="font-semibold text-slate-900">€ {{ formatCurrency(reportData.breakdown.income.card_sales ?? 0) }}</p>
            </div>
            <div class="rounded-lg bg-white p-2 text-center">
              <p class="text-xs text-slate-400">Άλλα</p>
              <p class="font-semibold text-slate-900">€ {{ formatCurrency(reportData.breakdown.income.other_income ?? 0) }}</p>
            </div>
          </div>
        </div>

        <!-- Entries List -->
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">ΕΓΓΡΑΦΕΣ ({{ entries.length }})</h3>
        
        <div v-if="entries.length > 0" class="space-y-3">
          <article
            v-for="entry in entries"
            :key="entry.id"
            class="flex flex-col rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-slate-900">{{ INCOME_CATEGORY_LABELS[entry.category as IncomeCategory] ?? entry.category }}</p>
                <p class="text-sm text-slate-500">{{ formatEntryDate(entry.date) }}</p>
              </div>
              <p class="text-lg font-bold text-emerald-600">€ {{ formatCurrency(entry.amount) }}</p>
            </div>
            <div v-if="entry.description || entry.createdByName" class="mt-3 border-t border-slate-200 pt-3">
              <div v-if="entry.description">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Σχόλια</p>
                <p class="mt-1 text-sm text-slate-700">{{ entry.description }}</p>
              </div>
              <div v-if="entry.createdByName" class="flex items-center gap-1.5" :class="entry.description ? 'mt-2' : ''">
                <User class="h-3.5 w-3.5 text-slate-400" />
                <p class="text-xs text-slate-400">{{ entry.createdByName }}</p>
              </div>
            </div>
          </article>
        </div>

        <p v-else class="py-8 text-center text-sm text-slate-500">
          Δεν βρέθηκαν έσοδα για την επιλεγμένη περίοδο.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Banknote, CreditCard, ClipboardList, PlusCircle, Search, Loader2, User } from 'lucide-vue-next';

import {
  addFinancialEntry,
  getFinancialReport,
  INCOME_CATEGORY_LABELS,
  type FinancialEntry,
  type FinancialReport,
  type IncomeCategory,
} from '@/services/api/financialApi';
import { formatCurrency } from '@/utils/date';

// Tab state
const activeTab = ref<'entry' | 'search'>('entry');

// Entry form state
const entryDate = ref(new Date().toISOString().split('T')[0]);
const cashAmount = ref<number | null>(null);
const cardAmount = ref<number | null>(null);
const otherAmount = ref<number | null>(null);
const incomeDescription = ref('');
const isSubmitting = ref(false);
const successMessage = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

// Search state
const searchStartDate = ref('');
const searchEndDate = ref('');
const selectedPeriod = ref('');
const isSearching = ref(false);
const hasSearched = ref(false);
const entries = ref<FinancialEntry[]>([]);
const reportData = ref<FinancialReport | null>(null);

const quickPeriods = [
  { label: 'Σήμερα', days: 0 },
  { label: 'Χθες', days: 1 },
  { label: 'Εβδομάδα', days: 7 },
  { label: 'Μήνας', days: 30 },
];

const totalIncome = computed(() => {
  return (cashAmount.value ?? 0) + (cardAmount.value ?? 0) + (otherAmount.value ?? 0);
});

const isValidRange = computed(() => {
  return searchStartDate.value && searchEndDate.value && new Date(searchStartDate.value) <= new Date(searchEndDate.value);
});

const selectQuickPeriod = (period: { label: string; days: number }) => {
  selectedPeriod.value = period.label;
  const today = new Date();
  
  if (period.days === 0) {
    searchStartDate.value = today.toISOString().split('T')[0];
    searchEndDate.value = today.toISOString().split('T')[0];
  } else if (period.days === 1) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    searchStartDate.value = yesterday.toISOString().split('T')[0];
    searchEndDate.value = yesterday.toISOString().split('T')[0];
  } else {
    const start = new Date(today);
    start.setDate(start.getDate() - period.days);
    searchStartDate.value = start.toISOString().split('T')[0];
    searchEndDate.value = today.toISOString().split('T')[0];
  }
};

const formatEntryDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const submitIncome = async () => {
  if (totalIncome.value === 0 || isSubmitting.value) return;

  isSubmitting.value = true;
  successMessage.value = null;
  errorMessage.value = null;

  try {
    const promises: Promise<unknown>[] = [];

    const extraDesc = incomeDescription.value.trim();

    if (cashAmount.value && cashAmount.value > 0) {
      promises.push(addFinancialEntry({
        type: 'income',
        category: 'cash_sales',
        amount: cashAmount.value,
        date: entryDate.value,
        description: extraDesc || undefined,
      }));
    }

    if (cardAmount.value && cardAmount.value > 0) {
      promises.push(addFinancialEntry({
        type: 'income',
        category: 'card_sales',
        amount: cardAmount.value,
        date: entryDate.value,
        description: extraDesc || undefined,
      }));
    }

    if (otherAmount.value && otherAmount.value > 0) {
      promises.push(addFinancialEntry({
        type: 'income',
        category: 'other_income',
        amount: otherAmount.value,
        date: entryDate.value,
        description: extraDesc || undefined,
      }));
    }

    await Promise.all(promises);

    successMessage.value = `Καταχωρήθηκαν έσοδα € ${formatCurrency(totalIncome.value)} για ${formatEntryDate(entryDate.value)}`;
    
    // Reset form
    cashAmount.value = null;
    cardAmount.value = null;
    otherAmount.value = null;
    incomeDescription.value = '';
  } catch (err) {
    console.error('Failed to submit income:', err);
    errorMessage.value = err instanceof Error ? err.message : 'Αποτυχία καταχώρησης εσόδων';
  } finally {
    isSubmitting.value = false;
  }
};

const searchEntries = async () => {
  if (!isValidRange.value || isSearching.value) return;

  isSearching.value = true;
  hasSearched.value = true;

  try {
    const response = await getFinancialReport({
      startDate: searchStartDate.value,
      endDate: searchEndDate.value,
      type: 'income',
    });

    reportData.value = response.data;
    entries.value = response.data.entries;
  } catch (err) {
    console.error('Failed to search entries:', err);
    entries.value = [];
    reportData.value = null;
  } finally {
    isSearching.value = false;
  }
};
</script>



