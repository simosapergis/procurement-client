<template>
  <section class="w-full pb-24">
    <header class="mb-6">
      <h2 class="text-2xl font-semibold text-slate-900">Εξαγωγή Τιμολογίων</h2>
      <p class="mt-1 text-sm text-slate-500">Επιλέξτε περίοδο και τιμολόγια για εξαγωγή</p>
    </header>

    <!-- Filter Card -->
    <div class="mb-8 overflow-hidden rounded-3xl bg-white shadow-lg">
      <Transition name="collapse">
        <div v-if="!isCollapsed" class="filter-content p-6 pb-0">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-400">ΕΠΙΛΟΓΗ ΠΕΡΙΟΔΟΥ</h3>
            <button
              v-if="hasSearched"
              type="button"
              class="text-xs font-medium text-primary-600 hover:text-primary-700"
              @click="isCollapsed = true"
            >
              Απόκρυψη
            </button>
          </div>

          <!-- Month Dropdown -->
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-slate-700">Μήνας</label>
            <select
              v-model="selectedMonth"
              class="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 sm:h-14 sm:px-4 sm:text-base"
              @change="onMonthSelected"
            >
              <option value="" disabled>Επιλέξτε μήνα</option>
              <option
                v-for="month in availableMonths"
                :key="month.value"
                :value="month.value"
              >
                {{ month.label }}
              </option>
            </select>
          </div>

          <!-- Custom Date Range -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <div class="min-w-0">
              <label class="mb-2 block text-sm font-medium text-slate-700">Από</label>
              <div class="relative">
                <input
                  v-model="startDate"
                  type="date"
                  :max="todayStr"
                  class="date-input h-12 w-full min-w-0 rounded-xl border-2 border-slate-200 bg-white px-3 text-sm text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 sm:h-14 sm:px-4 sm:text-base"
                  @change="onCustomDateChanged"
                />
              </div>
            </div>
            <div class="min-w-0">
              <label class="mb-2 block text-sm font-medium text-slate-700">Έως</label>
              <div class="relative">
                <input
                  v-model="endDate"
                  type="date"
                  :max="todayStr"
                  class="date-input h-12 w-full min-w-0 rounded-xl border-2 border-slate-200 bg-white px-3 text-sm text-slate-900 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 sm:h-14 sm:px-4 sm:text-base"
                  @change="onCustomDateChanged"
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Collapsed State -->
      <Transition name="fade">
        <div v-if="isCollapsed && hasSearched" class="flex items-center justify-between px-6 pt-4">
          <div class="flex items-center gap-2 text-sm text-slate-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ formatDisplayDate(startDate) }} - {{ formatDisplayDate(endDate) }}</span>
          </div>
          <button
            type="button"
            class="text-xs font-medium text-primary-600 hover:text-primary-700"
            @click="isCollapsed = false"
          >
            Αλλαγή
          </button>
        </div>
      </Transition>

      <!-- Search Button -->
      <div class="p-6" :class="{ 'pt-4': isCollapsed }">
        <button
          type="button"
          :disabled="!isValidRange || loading"
          class="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary-600 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
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

      <div v-else-if="invoices.length > 0">
        <!-- Global Select All -->
        <label class="mb-5 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            :checked="isAllSelected"
            :indeterminate="isPartiallySelected"
            class="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            @change="toggleSelectAll"
          />
          <span class="text-sm font-semibold text-slate-700">Επιλογή όλων</span>
        </label>

        <!-- Supplier Groups -->
        <div class="space-y-6">
          <div
            v-for="group in groupedBySupplier"
            :key="group.supplierId"
          >
            <!-- Supplier Group Header -->
            <div class="mb-3 flex items-center gap-3">
              <label class="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  :checked="isSupplierAllSelected(group.supplierId)"
                  :indeterminate="isSupplierPartiallySelected(group.supplierId)"
                  class="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  @change="toggleSupplierSelectAll(group.supplierId)"
                />
                <span class="text-sm font-semibold text-slate-900">{{ group.supplierName }}</span>
              </label>
              <span class="text-xs text-slate-400">({{ group.invoices.length }})</span>
            </div>

            <!-- Invoice Tiles Grid -->
            <div class="flex flex-wrap gap-3">
              <button
                v-for="invoice in group.invoices"
                :key="compositeKey(invoice)"
                type="button"
                class="flex w-[100px] flex-col items-center gap-2 rounded-2xl border-2 p-3 transition active:scale-95"
                :class="isSelected(invoice)
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'"
                @click="toggleInvoice(invoice)"
              >
                <!-- PDF Icon -->
                <svg class="h-8 w-8 flex-shrink-0" :class="isSelected(invoice) ? 'text-primary-600' : 'text-rose-500'" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" opacity="0.2" />
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                  <text x="7" y="18" font-size="5.5" font-weight="bold" fill="currentColor">PDF</text>
                </svg>
                <!-- Invoice Number -->
                <span class="w-full truncate text-center text-xs font-medium" :class="isSelected(invoice) ? 'text-primary-700' : 'text-slate-700'">
                  ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.id }}
                </span>
                <!-- Downloaded Badge -->
                <span
                  v-if="isDownloadedByMe(invoice)"
                  class="whitespace-nowrap rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700"
                >
                  Ληφθέν
                </span>
              </button>
            </div>

            <!-- Group Separator -->
            <div class="mt-4 h-px bg-slate-100" />
          </div>
        </div>
      </div>

      <p v-else class="py-8 text-center text-sm text-slate-500">
        Δεν βρέθηκαν τιμολόγια για την επιλεγμένη περίοδο.
      </p>
    </div>

    <!-- Sticky Export Bar -->
    <Transition name="slide-up">
      <div
        v-if="selectedIds.size > 0"
        class="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/90 px-6 py-4 shadow-lg backdrop-blur-md"
      >
        <div class="mx-auto flex max-w-lg items-center justify-between">
          <p class="text-sm font-medium text-slate-700">
            Επιλεγμένα: <span class="font-bold text-primary-600">{{ selectedIds.size }}</span> τιμολόγια
          </p>
          <button
            type="button"
            :disabled="exporting"
            class="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
            @click="handleExport"
          >
            <svg v-if="exporting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {{ exporting ? 'Εξαγωγή...' : 'Εξαγωγή ZIP' }}
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Loader from '@/components/Loader.vue';
import { useAuth } from '@/composables/useAuth';
import { useFirestore, type ExportInvoice } from '@/composables/useFirestore';
import { useNotifications } from '@/composables/useNotifications';
import {
  getAvailableMonths,
  applyMonth as applyMonthHelper,
  groupBySupplier,
  compositeKey,
  type SupplierGroup,
} from '@/pages/exportInvoicesHelpers';
import { exportInvoices } from '@/services/api/exportInvoices';

const route = useRoute();
const router = useRouter();
const { user } = useAuth();
const { fetchInvoicesByInvoiceDate } = useFirestore();
const { notifySuccess, notifyError } = useNotifications();

// --- Filter state ---
const selectedMonth = ref('');
const startDate = ref('');
const endDate = ref('');
const loading = ref(false);
const exporting = ref(false);
const error = ref<string | null>(null);
const invoices = ref<ExportInvoice[]>([]);
const hasSearched = ref(false);
const isCollapsed = ref(false);

// --- Selection state ---
const selectedIds = ref<Set<string>>(new Set());

// --- Today ---
const today = new Date();
const todayStr = today.toISOString().split('T')[0];

// --- Month dropdown options ---
const availableMonths = computed(() => getAvailableMonths(today));

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const isValidRange = computed(() => {
  return startDate.value && endDate.value && new Date(startDate.value) <= new Date(endDate.value);
});

// --- URL query param sync ---
const syncQueryParams = () => {
  const query: Record<string, string> = {};
  if (selectedMonth.value) {
    query.month = selectedMonth.value;
  } else if (startDate.value && endDate.value) {
    query.from = startDate.value;
    query.to = endDate.value;
  }
  router.replace({ query });
};

// --- Filter handlers ---
const applyMonth = (monthValue: string) => {
  const result = applyMonthHelper(monthValue, today);
  startDate.value = result.startDate;
  endDate.value = result.endDate;
};

const onMonthSelected = () => {
  if (!selectedMonth.value) return;
  applyMonth(selectedMonth.value);
  syncQueryParams();
};

const onCustomDateChanged = () => {
  selectedMonth.value = '';
  syncQueryParams();
};

// --- Grouped invoices ---
const groupedBySupplier = computed<SupplierGroup[]>(() => groupBySupplier(invoices.value));

// --- Selection logic ---
const isSelected = (invoice: ExportInvoice): boolean => {
  return selectedIds.value.has(compositeKey(invoice));
};

const isAllSelected = computed(() => {
  return invoices.value.length > 0 && selectedIds.value.size === invoices.value.length;
});

const isPartiallySelected = computed(() => {
  return selectedIds.value.size > 0 && selectedIds.value.size < invoices.value.length;
});

const isSupplierAllSelected = (supplierId: string): boolean => {
  const group = groupedBySupplier.value.find((g) => g.supplierId === supplierId);
  if (!group || group.invoices.length === 0) return false;
  return group.invoices.every((inv) => selectedIds.value.has(compositeKey(inv)));
};

const isSupplierPartiallySelected = (supplierId: string): boolean => {
  const group = groupedBySupplier.value.find((g) => g.supplierId === supplierId);
  if (!group || group.invoices.length === 0) return false;
  const selectedCount = group.invoices.filter((inv) => selectedIds.value.has(compositeKey(inv))).length;
  return selectedCount > 0 && selectedCount < group.invoices.length;
};

const toggleInvoice = (invoice: ExportInvoice) => {
  const key = compositeKey(invoice);
  const next = new Set(selectedIds.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  selectedIds.value = next;
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = new Set();
  } else {
    selectedIds.value = new Set(invoices.value.map(compositeKey));
  }
};

const toggleSupplierSelectAll = (supplierId: string) => {
  const group = groupedBySupplier.value.find((g) => g.supplierId === supplierId);
  if (!group) return;

  const next = new Set(selectedIds.value);
  const allSelected = isSupplierAllSelected(supplierId);

  for (const inv of group.invoices) {
    const key = compositeKey(inv);
    if (allSelected) {
      next.delete(key);
    } else {
      next.add(key);
    }
  }
  selectedIds.value = next;
};

// --- Download badge ---
const isDownloadedByMe = (invoice: ExportInvoice): boolean => {
  if (!user.value?.uid) return false;
  return Boolean(invoice.downloadedBy[user.value.uid]);
};

// --- Search ---
const searchInvoices = async () => {
  if (!isValidRange.value) return;

  loading.value = true;
  error.value = null;
  hasSearched.value = true;
  isCollapsed.value = true;
  selectedIds.value = new Set();

  try {
    const start = new Date(startDate.value);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate.value);
    end.setHours(23, 59, 59, 999);

    invoices.value = await fetchInvoicesByInvoiceDate(start, end);
  } catch (err) {
    console.error('Failed to fetch invoices:', err);
    error.value = err instanceof Error ? err.message : 'Αδυναμία φόρτωσης τιμολογίων';
  } finally {
    loading.value = false;
  }
};

// --- Auto-load from query params ---
onMounted(() => {
  const monthParam = route.query.month as string | undefined;
  const fromParam = route.query.from as string | undefined;
  const toParam = route.query.to as string | undefined;

  if (monthParam) {
    // Validate month param matches an available option
    const isValid = availableMonths.value.some((m) => m.value === monthParam);
    if (isValid) {
      selectedMonth.value = monthParam;
      applyMonth(monthParam);
      searchInvoices();
    }
  } else if (fromParam && toParam) {
    startDate.value = fromParam;
    endDate.value = toParam;
    if (isValidRange.value) {
      searchInvoices();
    }
  }
});

// --- Export ---
const handleExport = async () => {
  if (selectedIds.value.size === 0) return;

  exporting.value = true;

  try {
    const invoicePairs = Array.from(selectedIds.value).map((key) => {
      const [supplierId, invoiceId] = key.split('/');
      return { supplierId, invoiceId };
    });

    const response = await exportInvoices({ invoices: invoicePairs });

    if (response.success && response.data?.downloadUrl) {
      notifySuccess(`Εξαγωγή ${response.data.invoiceCount} τιμολογίων ολοκληρώθηκε`);
      window.open(response.data.downloadUrl, '_blank');

      // Re-fetch to update downloadedBy badges
      await searchInvoices();
    } else {
      notifyError(response.message || 'Δεν βρέθηκαν αρχεία PDF για εξαγωγή');
    }
  } catch (err) {
    console.error('Export failed:', err);
    notifyError(err instanceof Error ? err.message : 'Αποτυχία εξαγωγής τιμολογίων');
  } finally {
    exporting.value = false;
  }
};
</script>

<style scoped>
/* Date input styling for mobile */
.date-input {
  -webkit-appearance: none;
  appearance: none;
}

.date-input::-webkit-calendar-picker-indicator {
  opacity: 0.6;
}

/* Collapse animation */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  opacity: 1;
  max-height: 500px;
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide up animation for sticky bar */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
