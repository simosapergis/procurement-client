<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        @click.self="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" @click="$emit('close')" />

        <!-- Modal Panel - Almost Full Screen -->
        <article
          class="relative flex h-full max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-2xl"
        >
          <!-- Header -->
          <header class="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
            <div class="min-w-0 flex-1">
              <p class="text-xs uppercase tracking-widest text-primary-600">ΛΕΠΤΟΜΕΡΕΙΕΣ ΤΙΜΟΛΟΓΙΟΥ</p>
              <h3 class="text-2xl font-bold text-slate-900">
                ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.id }}
              </h3>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2">
              <!-- Edit Button -->
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Edit"
                @click="$emit('edit')"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <!-- Close Button -->
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
                @click="$emit('close')"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <dl class="grid gap-5 sm:grid-cols-2">
              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Προμηθευτής</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ invoice.supplierName ?? '—' }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΑΦΜ Προμηθευτή</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ invoice.supplierTaxNumber ?? '—' }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Αριθμός Τιμολογίου</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ invoice.invoiceNumber ?? '—' }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Ημερομηνία Μεταφόρτωσης</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ formattedUploadedAt }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Συνολικό Ποσό</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  € {{ formattedTotal }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Ανεξόφλητο Ποσό</dt>
                <dd class="mt-1 text-lg font-semibold" :class="unpaidColor">
                  € {{ formattedUnpaid }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Καθαρό Ποσό</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  € {{ formattedNet }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΦΠΑ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  € {{ formattedVat }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:col-span-2">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Διαδρομή Αρχείου</dt>
                <dd class="mt-1 text-sm font-medium text-slate-700 break-all">
                  {{ invoice.filePath ?? '—' }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Footer -->
          <footer class="shrink-0 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
            <div class="flex items-center justify-end">
              <button
                type="button"
                class="flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                @click="$emit('close')"
              >
                Κλείσιμο
              </button>
            </div>
          </footer>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { formatDateTime } from '@/utils/date';

const props = defineProps<{
  isOpen: boolean;
  invoice: Invoice;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'edit'): void;
}>();

const formattedUploadedAt = computed(() => formatDateTime(props.invoice.uploadedAt));
const formattedTotal = computed(() => (props.invoice.totalAmount ?? 0).toFixed(2));
const formattedUnpaid = computed(() => (props.invoice.unpaidAmount ?? 0).toFixed(2));
const formattedNet = computed(() => (props.invoice.netAmount ?? 0).toFixed(2));
const formattedVat = computed(() => (props.invoice.vatAmount ?? 0).toFixed(2));

const unpaidColor = computed(() =>
  (props.invoice.unpaidAmount ?? 0) > 0 ? 'text-amber-600' : 'text-emerald-600'
);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-active article,
.modal-leave-active article {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from article,
.modal-leave-to article {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>
