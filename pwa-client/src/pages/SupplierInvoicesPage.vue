<template>
  <section class="w-full">
    <!-- Back navigation -->
    <button
      type="button"
      class="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
      @click="goBack"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Προμηθευτές
    </button>

    <!-- Supplier Header -->
    <header v-if="supplier" class="mb-8 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-white shadow-lg">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0 flex-1">
          <p class="text-xs font-medium uppercase tracking-widest text-primary-200">ΠΡΟΜΗΘΕΥΤΗΣ</p>
          <h1 class="mt-1 text-2xl font-bold sm:text-3xl">{{ supplier.name }}</h1>
          <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-100">
            <span v-if="supplier.supplierTaxNumber || supplier.id" class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ΑΦΜ: {{ supplier.supplierTaxNumber ?? supplier.id }}
            </span>
            <span v-if="supplier.contactEmail" class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ supplier.contactEmail }}
            </span>
            <span v-if="supplier.contactPhone" class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ supplier.contactPhone }}
            </span>
            <!-- Delivery Info -->
            <span v-if="hasDeliveryInfo" class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Παραδίδει: {{ deliveryDayLabel }}<template v-if="deliveryTimeRange">, {{ deliveryTimeRange }}</template>
            </span>
          </div>
        </div>

        <!-- Right side: Status + Edit button -->
        <div class="flex flex-col items-end gap-3">
          <!-- Edit Button -->
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Επεξεργασία προμηθευτή"
            @click="openSupplierEditModal"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <!-- Status Badge -->
          <span v-if="supplier.status" :class="statusBadgeClass">
            {{ statusLabel }}
          </span>
        </div>
      </div>
    </header>

    <!-- Loading state for supplier -->
    <Loader v-else-if="supplierLoading" label="Φόρτωση προμηθευτή..." />

    <!-- Invoices Section -->
    <div class="rounded-3xl bg-white p-6 shadow-lg">
      <header class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-900">Τιμολόγια</h2>
        <p v-if="invoices.length > 0" class="text-sm text-slate-500">
          {{ invoices.length }} {{ invoices.length === 1 ? 'τιμολόγιο' : 'τιμολόγια' }}
        </p>
      </header>

      <Loader v-if="invoiceLoading" label="Φόρτωση τιμολογίων..." />
      <p v-else-if="invoiceError" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
        {{ invoiceError }}
      </p>
      <div v-else class="grid gap-4 md:grid-cols-2">
        <InvoicePreviewCard
          v-for="invoice in invoices"
          :key="invoice.id"
          :invoice="invoice"
          @select="selectInvoice"
          @payment="openPaymentModal"
        />
      </div>
      <p v-if="!invoiceLoading && invoices.length === 0" class="py-8 text-center text-sm text-slate-500">
        Δεν βρέθηκαν τιμολόγια για αυτόν τον προμηθευτή.
      </p>
    </div>

    <!-- Invoice Detail Modal -->
    <InvoiceDetailView
      v-if="selectedInvoice"
      :is-open="detailModalOpen"
      :invoice="selectedInvoice"
      @close="clearInvoiceSelection"
      @updated="handleInvoiceUpdated"
    />

    <!-- Supplier Edit Modal -->
    <SupplierEditModal
      v-if="supplier"
      :is-open="supplierEditModalOpen"
      :supplier="supplier"
      @close="closeSupplierEditModal"
      @updated="handleSupplierUpdated"
    />

    <!-- Payment Modal -->
    <PaymentModal
      :is-open="paymentModalOpen"
      :invoice-id="paymentInvoice?.id ?? ''"
      :supplier-id="paymentInvoice?.supplierId ?? paymentInvoice?.supplierTaxNumber ?? supplierId"
      :supplier-name="paymentInvoice?.supplierName ?? supplier?.name ?? ''"
      :total-amount="paymentInvoice?.unpaidAmount ?? paymentInvoice?.totalAmount ?? 0"
      :loading="submitting"
      :status="modalStatus"
      :error-message="modalErrorMessage"
      :error-details="modalErrorDetails"
      @close="closePaymentModal"
      @submit="handlePaymentSubmit"
      @retry="handlePaymentRetry"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import InvoiceDetailView from '@/components/InvoiceDetailView.vue';
import InvoicePreviewCard from '@/components/InvoicePreviewCard.vue';
import Loader from '@/components/Loader.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import SupplierEditModal from '@/components/SupplierEditModal.vue';
import { clearDeliveryCache } from '@/composables/useFirestore';
import { useSupplierInvoices } from '@/composables/useSupplierInvoices';
import { useSuppliers } from '@/composables/useSuppliers';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import type { Supplier } from '@/modules/suppliers/Supplier';
import { PaymentError, updatePaymentStatus } from '@/services/api/updatePaymentStatus';
import { useSupplierStore } from '@/store/supplierStore';

const route = useRoute();
const router = useRouter();
const supplierStore = useSupplierStore();
const { hydrate } = useSuppliers();
const { invoices, loading: invoiceLoading, error: invoiceError, loadInvoices, updateInvoice } = useSupplierInvoices();

const supplierId = computed(() => route.params.supplierId as string);
const supplier = ref<Supplier | null>(null);
const supplierLoading = ref(true);

// Invoice detail state
const selectedInvoice = ref<Invoice | null>(null);
const detailModalOpen = ref(false);

// Supplier edit modal state
const supplierEditModalOpen = ref(false);

// Payment modal state
const paymentModalOpen = ref(false);
const paymentInvoice = ref<Invoice | null>(null);
const modalStatus = ref<'form' | 'success' | 'error'>('form');
const modalErrorMessage = ref('');
const modalErrorDetails = ref<string[]>([]);
const submitting = ref(false);

// Days of week mapping for display
const daysOfWeekLabels: Record<number, string> = {
  1: 'Δευτέρα',
  2: 'Τρίτη',
  3: 'Τετάρτη',
  4: 'Πέμπτη',
  5: 'Παρασκευή',
  6: 'Σάββατο',
  7: 'Κυριακή',
};

// Delivery info computed properties
const hasDeliveryInfo = computed(() => {
  return supplier.value?.delivery?.dayOfWeek !== undefined;
});

const deliveryDayLabel = computed(() => {
  const dayOfWeek = supplier.value?.delivery?.dayOfWeek;
  if (dayOfWeek === undefined) return '';
  return daysOfWeekLabels[dayOfWeek] ?? '';
});

const formatTime = (hour?: number, minute?: number): string => {
  if (hour === undefined) return '';
  const h = hour.toString().padStart(2, '0');
  const m = (minute ?? 0).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const deliveryTimeRange = computed(() => {
  const delivery = supplier.value?.delivery;
  if (!delivery) return '';

  const fromTime = formatTime(delivery.from?.hour, delivery.from?.minute);
  const toTime = formatTime(delivery.to?.hour, delivery.to?.minute);

  if (fromTime && toTime) {
    return `${fromTime} - ${toTime}`;
  } else if (fromTime) {
    return `από ${fromTime}`;
  } else if (toTime) {
    return `έως ${toTime}`;
  }
  return '';
});

const statusBadgeClass = computed(() => {
  const base = 'rounded-full px-3 py-1 text-xs font-semibold';
  switch (supplier.value?.status) {
    case 'active':
      return `${base} bg-white/20 text-white`;
    case 'prospect':
      return `${base} bg-amber-400/20 text-amber-100`;
    case 'inactive':
      return `${base} bg-white/10 text-primary-200`;
    default:
      return `${base} bg-white/20 text-white`;
  }
});

const statusLabel = computed(() => {
  switch (supplier.value?.status) {
    case 'active':
      return 'Ενεργός';
    case 'prospect':
      return 'Υποψήφιος';
    case 'inactive':
      return 'Ανενεργός';
    default:
      return supplier.value?.status ?? '';
  }
});

const goBack = () => {
  router.push({ name: 'suppliers' });
};

const loadSupplierData = async () => {
  supplierLoading.value = true;
  try {
    // Ensure suppliers are loaded in the store
    await hydrate();
    // Get supplier from store
    supplier.value = supplierStore.getSupplierById(supplierId.value) ?? null;
    // Load invoices
    await loadInvoices(supplierId.value);
  } finally {
    supplierLoading.value = false;
  }
};

// Invoice selection - use already loaded data (no Firebase call needed)
const selectInvoice = (invoiceId: string) => {
  const invoice = invoices.value.find((inv) => inv.id === invoiceId);
  if (invoice) {
    selectedInvoice.value = invoice;
    detailModalOpen.value = true;
  }
};

const clearInvoiceSelection = () => {
  detailModalOpen.value = false;
  setTimeout(() => {
    selectedInvoice.value = null;
  }, 300);
};

// Supplier edit modal functions
const openSupplierEditModal = () => {
  supplierEditModalOpen.value = true;
};

const closeSupplierEditModal = () => {
  supplierEditModalOpen.value = false;
};

const handleSupplierUpdated = (updatedSupplier: Supplier) => {
  // Update local state
  supplier.value = updatedSupplier;
  // Also update the store
  supplierStore.updateSupplier(updatedSupplier);
  // Clear delivery cache so overview page fetches fresh data
  clearDeliveryCache();
};

// Payment modal functions
const openPaymentModal = (invoice: Invoice) => {
  paymentInvoice.value = invoice;
  modalStatus.value = 'form';
  modalErrorMessage.value = '';
  modalErrorDetails.value = [];
  paymentModalOpen.value = true;
};

// Handle invoice updated from detail view
const handleInvoiceUpdated = (updatedInvoice: Invoice) => {
  // Update the invoice in the local array
  updateInvoice(updatedInvoice);
  // Also update the selected invoice ref so the modal shows updated data
  selectedInvoice.value = updatedInvoice;
};

const closePaymentModal = () => {
  paymentModalOpen.value = false;
  setTimeout(() => {
    paymentInvoice.value = null;
    modalStatus.value = 'form';
    modalErrorMessage.value = '';
    modalErrorDetails.value = [];
  }, 300);
};

const handlePaymentRetry = () => {
  modalStatus.value = 'form';
  modalErrorMessage.value = '';
  modalErrorDetails.value = [];
};

const handlePaymentSubmit = async (payload: { invoiceId: string; supplierId: string; amount: number }) => {
  if (submitting.value || !paymentInvoice.value) return;

  submitting.value = true;
  const invoiceTotalAmount = paymentInvoice.value.unpaidAmount ?? paymentInvoice.value.totalAmount ?? 0;
  const isFullPayment = payload.amount >= invoiceTotalAmount;

  try {
    await updatePaymentStatus({
      supplierId: payload.supplierId,
      invoiceId: payload.invoiceId,
      action: isFullPayment ? 'pay' : 'partial',
      amount: payload.amount,
      paymentDate: new Date().toISOString(),
    });

    // Update local state to reflect payment
    const invoice = invoices.value.find((inv) => inv.id === payload.invoiceId);
    if (invoice) {
      if (isFullPayment) {
        invoice.paymentStatus = 'paid';
        invoice.unpaidAmount = 0;
      } else {
        invoice.unpaidAmount = (invoice.unpaidAmount ?? invoice.totalAmount ?? 0) - payload.amount;
        invoice.paymentStatus = 'partially_paid';
      }
    }

    // Also update selectedInvoice if it's the same invoice
    if (selectedInvoice.value?.id === payload.invoiceId) {
      if (isFullPayment) {
        selectedInvoice.value.paymentStatus = 'paid';
        selectedInvoice.value.unpaidAmount = 0;
      } else {
        selectedInvoice.value.unpaidAmount = (selectedInvoice.value.unpaidAmount ?? selectedInvoice.value.totalAmount ?? 0) - payload.amount;
        selectedInvoice.value.paymentStatus = 'partially_paid';
      }
    }

    modalStatus.value = 'success';
  } catch (err) {
    console.error('Payment failed:', err);
    if (err instanceof PaymentError) {
      modalErrorMessage.value = err.message;
      modalErrorDetails.value = err.details;
    } else {
      modalErrorMessage.value = err instanceof Error ? err.message : 'Αποτυχία καταχώρησης πληρωμής';
      modalErrorDetails.value = [];
    }
    modalStatus.value = 'error';
  } finally {
    submitting.value = false;
  }
};

// Load data when route changes
watch(supplierId, () => {
  loadSupplierData();
});

onMounted(() => {
  loadSupplierData();
});
</script>
