<template>
  <article
    class="cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.98]"
    @click="handleClick"
  >
    <!-- Mobile Layout -->
    <div class="sm:hidden">
      <!-- Row 1: Invoice ID -->
      <div>
        <p class="text-sm font-semibold text-slate-900">
          ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.invoiceId ?? invoice.id }}
        </p>
        <p class="mt-0.5 text-xs text-slate-400">
          Εκδόθηκε {{ invoiceDate }}
        </p>
      </div>

      <!-- Row 2: Amount + Status Badge + Payment Button -->
      <div class="mt-3 flex items-center justify-between">
        <p class="text-lg font-bold text-slate-900">
          {{ currencySymbol }} {{ totalAmount }}
        </p>
        <div class="flex flex-col items-end gap-1.5">
          <StatusBadge :status="invoice.paymentStatus ?? invoice.status" />
          <button
            v-if="!isPaid"
            type="button"
            class="flex h-8 items-center gap-1.5 rounded-lg bg-primary-50 px-2.5 text-primary-600 transition active:scale-95"
            @click.stop="handlePayment"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-xs font-medium">Πληρωμή</span>
          </button>
        </div>
      </div>

      <!-- Row 3: Unpaid amount (only for partially paid) -->
      <p v-if="isPartiallyPaid" class="mt-1 text-sm font-medium text-amber-600">
        Υπόλοιπο: {{ currencySymbol }} {{ unpaidAmount }}
      </p>

      <!-- Row 4: Status message (only if there's a message or error) -->
      <p v-if="invoice.statusMessage || invoice.errorMessage" class="mt-2 text-xs text-slate-500 line-clamp-2">
        {{ invoice.statusMessage ?? invoice.errorMessage }}
      </p>

      <!-- Row 5: Upload date -->
      <p class="mt-2 text-xs text-slate-400">
        Μεταφορτώθηκε {{ formattedDate }}
      </p>
    </div>

    <!-- Desktop Layout (sm+) -->
    <div class="hidden sm:block">
      <div class="flex items-start justify-between">
        <!-- Left: Invoice info -->
        <div class="flex-1">
          <p class="text-sm font-semibold text-slate-900">
            ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.invoiceId ?? invoice.id }}
          </p>
          <p class="text-xs text-slate-500">
            Εκδόθηκε {{ invoiceDate }}
          </p>
        </div>

        <!-- Right: Amount + Badge + Payment stacked -->
        <div class="flex items-start gap-3">
          <div class="text-right">
            <p class="text-sm font-bold text-slate-900">
              {{ currencySymbol }} {{ totalAmount }}
            </p>
            <!-- Unpaid amount below total -->
            <p v-if="isPartiallyPaid" class="mt-0.5 text-xs font-medium text-amber-600">
              Υπόλοιπο: {{ currencySymbol }} {{ unpaidAmount }}
            </p>
            <p v-else class="mt-0.5 text-xs text-slate-400">
              {{ formattedDate }}
            </p>
          </div>
          <div class="flex flex-col items-end gap-1.5">
            <StatusBadge :status="invoice.paymentStatus ?? invoice.status" />
            <button
              v-if="!isPaid"
              type="button"
              class="flex h-8 items-center gap-1.5 rounded-lg bg-primary-50 px-2.5 text-primary-600 transition hover:bg-primary-100 active:scale-95"
              @click.stop="handlePayment"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="text-xs font-medium">Πληρωμή</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Status message (only if there's a message or error) -->
      <p v-if="invoice.statusMessage || invoice.errorMessage" class="mt-2 text-xs text-slate-500 line-clamp-1">
        {{ invoice.statusMessage ?? invoice.errorMessage }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import StatusBadge from '@/components/StatusBadge.vue';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { formatDateTime } from '@/utils/date';

const props = defineProps<{ invoice: Invoice }>();
const emit = defineEmits<{
  (e: 'select', invoiceId: string): void;
  (e: 'payment', invoice: Invoice): void;
}>();

const formattedDate = computed(() => formatDateTime(props.invoice.uploadedAt));
const invoiceDate = computed(() => formatDateTime(props.invoice.invoiceDate));
const totalAmount = computed(() => (props.invoice.totalAmount ?? 0).toFixed(2));
const unpaidAmount = computed(() => (props.invoice.unpaidAmount ?? 0).toFixed(2));

const currencySymbol = computed(() => 
  props.invoice.currency === 'EUR' || props.invoice.currency === '€' ? '€' : '$'
);

const isPaid = computed(() => props.invoice.paymentStatus === 'paid');
const isPartiallyPaid = computed(() => props.invoice.paymentStatus === 'partially_paid');

const handleClick = () => emit('select', props.invoice.id);
const handlePayment = () => emit('payment', props.invoice);
</script>
