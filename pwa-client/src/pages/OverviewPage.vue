<template>
  <section class="w-full">
    <header class="mb-6">
      <p class="text-xs uppercase tracking-wide text-primary-600">Dashboard</p>
      <h2 class="text-2xl font-semibold text-slate-900">Επισκόπηση</h2>
      <p class="mt-1 text-sm text-slate-500">Ανεξόφλητα και μερικώς εξοφλημένα τιμολόγια</p>
    </header>

    <div class="mb-6 grid gap-4 sm:grid-cols-2">
      <div class="flex rounded-2xl bg-white p-5 shadow-sm">
        <div class="flex-1">
          <p class="text-xs tracking-wide text-slate-400">Σύνολο Τιμολογίων</p>
          <p class="mt-1 text-3xl font-bold text-slate-900">{{ invoices.length }}</p>
        </div>
        <div class="flex-1 border-l border-slate-100 pl-5">
          <p class="text-xs tracking-wide text-slate-400">Σύνολο Προμηθευτών</p>
          <p class="mt-1 text-3xl font-bold text-slate-900">{{ uniqueSupplierCount }}</p>
        </div>
      </div>
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <p class="text-xs tracking-wide text-slate-400">Σύνολο Υπολοίπων</p>
        <p class="mt-1 text-3xl font-bold text-slate-900">€ {{ totalAmount }}</p>
      </div>
    </div>

    <Loader v-if="loading" label="Φόρτωση τιμολογίων..." />
    <p v-else-if="error" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
      {{ error }}
    </p>

    <div v-else class="space-y-3 sm:space-y-4">
      <article
        v-for="invoice in invoices"
        :key="invoice.id"
        class="rounded-2xl bg-white p-4 shadow-sm"
      >
        <!-- Mobile Layout -->
        <div class="sm:hidden">
          <!-- Row 1: Supplier name + Payment button -->
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-slate-900">
                {{ invoice.supplierName }}
              </p>
              <p class="mt-0.5 text-xs text-slate-400">
                ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.id }}
              </p>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition active:scale-95"
              @click.stop="openPaymentModal(invoice)"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
          <!-- Row 2: Amounts -->
          <div class="mt-3 flex items-baseline justify-between">
            <p class="text-lg font-bold text-slate-900">
              € {{ (invoice.totalAmount ?? 0).toFixed(2) }}
            </p>
            <p class="text-sm font-medium" :class="invoice.unpaidAmount ? 'text-amber-600' : 'text-emerald-600'">
              Υπόλοιπο: € {{ (invoice.unpaidAmount ?? 0).toFixed(2) }}
            </p>
          </div>
          <!-- Row 3: Badges -->
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <ExpiryBadge :invoice-date="invoice.invoiceDate" />
            <StatusBadge :status="invoice.paymentStatus ?? invoice.status" />
          </div>
        </div>

        <!-- Desktop Layout (sm+) -->
        <div class="hidden sm:flex sm:items-center sm:justify-between">
          <div class="flex-1">
            <p class="text-sm font-semibold text-slate-900">
              {{ invoice.supplierName }}
            </p>
            <p class="text-xs text-slate-500">
              ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.id }}
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
          <div class="ml-4 flex items-center gap-2">
            <ExpiryBadge :invoice-date="invoice.invoiceDate" />
            <StatusBadge :status="invoice.paymentStatus ?? invoice.status" />
            <button
              type="button"
              class="flex h-9 items-center gap-2 rounded-xl bg-primary-50 px-3 text-primary-600 transition hover:bg-primary-100 active:scale-95"
              @click.stop="openPaymentModal(invoice)"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="text-sm font-medium">Πληρωμή</span>
            </button>
          </div>
        </div>
      </article>
    </div>

    <p v-if="!loading && invoices.length === 0" class="mt-4 text-sm text-slate-500">
      Δεν βρέθηκαν ανεξόφλητα τιμολόγια.
    </p>

    <!-- Payment Modal -->
    <PaymentModal
      :is-open="paymentModalOpen"
      :invoice-id="selectedInvoice?.id ?? ''"
      :supplier-id="selectedInvoice?.supplierId ?? selectedInvoice?.supplierTaxNumber ?? ''"
      :supplier-name="selectedInvoice?.supplierName ?? ''"
      :total-amount="selectedInvoice?.unpaidAmount ?? selectedInvoice?.totalAmount ?? 0"
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
import { computed, onMounted, ref } from 'vue';

import ExpiryBadge from '@/components/ExpiryBadge.vue';
import Loader from '@/components/Loader.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { useFirestore } from '@/composables/useFirestore';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { PaymentError, updatePaymentStatus } from '@/services/api/updatePaymentStatus';

const { fetchUnpaidInvoices } = useFirestore();

const invoices = ref<Invoice[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Payment modal state
const paymentModalOpen = ref(false);
const selectedInvoice = ref<Invoice | null>(null);
const modalStatus = ref<'form' | 'success' | 'error'>('form');
const modalErrorMessage = ref('');
const modalErrorDetails = ref<string[]>([]);

const totalAmount = computed(() =>
  invoices.value.reduce((sum, inv) => sum + (inv.unpaidAmount ?? inv.totalAmount ?? 0), 0).toFixed(2)
);

const uniqueSupplierCount = computed(() => {
  const supplierIds = new Set(invoices.value.map((inv) => inv.supplierId ?? inv.supplierTaxNumber));
  return supplierIds.size;
});

const openPaymentModal = (invoice: Invoice) => {
  selectedInvoice.value = invoice;
  modalStatus.value = 'form';
  modalErrorMessage.value = '';
  modalErrorDetails.value = [];
  paymentModalOpen.value = true;
};

const closePaymentModal = () => {
  paymentModalOpen.value = false;
  // Delay resetting state so the closing animation completes
  setTimeout(() => {
    selectedInvoice.value = null;
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

const submitting = ref(false);

const handlePaymentSubmit = async (payload: { invoiceId: string; supplierId: string; amount: number }) => {
  if (submitting.value || !selectedInvoice.value) return;

  submitting.value = true;
  const invoiceTotalAmount = selectedInvoice.value.unpaidAmount ?? selectedInvoice.value.totalAmount ?? 0;
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
        // Remove from unpaid list
        invoices.value = invoices.value.filter((inv) => inv.id !== payload.invoiceId);
      } else {
        // Update unpaid amount
        invoice.unpaidAmount = (invoice.unpaidAmount ?? invoice.totalAmount ?? 0) - payload.amount;
        invoice.paymentStatus = 'partially_paid';
      }
    }

    // Show success state in modal
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

