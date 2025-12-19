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
          <header class="header-compact flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
            <div class="min-w-0 flex-1 pr-2">
              <p class="header-subtitle text-xs uppercase tracking-widest text-primary-600">ΛΕΠΤΟΜΕΡΕΙΕΣ ΤΙΜΟΛΟΓΙΟΥ</p>
              <p class="header-subtitle-short text-xs uppercase tracking-wide text-primary-600">ΤΙΜΟΛΟΓΙΟ</p>
              <h3 class="header-title truncate text-xl font-bold text-slate-900 sm:text-2xl">
                ΤΔΑ-{{ invoice.invoiceNumber ?? invoice.id }}
              </h3>
            </div>

            <!-- Action Buttons -->
            <div class="flex shrink-0 items-center gap-1 sm:gap-2">
              <!-- Edit Button -->
              <button
                type="button"
                class="header-btn flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:h-10 sm:w-10"
                aria-label="Edit"
                @click="$emit('edit')"
              >
                <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <!-- Close Button -->
              <button
                type="button"
                class="header-btn flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:h-10 sm:w-10"
                aria-label="Close"
                @click="$emit('close')"
              >
                <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <dl class="grid gap-5 sm:grid-cols-2">
              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΠΡΟΜΗΘΕΥΤΗΣ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ invoice.supplierName ?? '—' }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Α.Φ.Μ. ΠΡΟΜΗΘΕΥΤΗ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ invoice.supplierTaxNumber ?? '—' }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΑΡΙΘΜΟΣ ΤΙΜΟΛΟΓΙΟΥ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ invoice.invoiceNumber ?? '—' }}
                </dd>
              </div>
              
              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">HΜΕΡΟΜΗΝΙΑ ΕΚΔΟΣΗΣ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ formattedInvoiceDate }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΗΜΕΡΟΜΗΝΙΑ ΜΕΤΑΦΟΡΤΩΣΗΣ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  {{ formattedUploadedAt }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΣΥΝΟΛΙΚΟ ΠΟΣΟ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  € {{ formattedTotal }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΑΝΕΞΟΦΛΗΤΟ ΠΟΣΟ</dt>
                <dd class="mt-1 text-lg font-semibold" :class="unpaidColor">
                  € {{ formattedUnpaid }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΚΑΘΑΡΟ ΠΟΣΟ</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  € {{ formattedNet }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <dt class="text-xs uppercase tracking-wide text-slate-400">Φ.Π.Α.</dt>
                <dd class="mt-1 text-lg font-semibold text-slate-900">
                  € {{ formattedVat }}
                </dd>
              </div>

              <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:col-span-2">
                <dt class="text-xs uppercase tracking-wide text-slate-400">ΑΡΧΕΙΟ ΤΙΜΟΛΟΓΙΟΥ</dt>
                <dd class="mt-2">
                  <button
                    v-if="invoice.filePath"
                    type="button"
                    :disabled="loadingPdf"
                    class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                    @click="openPdf"
                  >
                    <svg v-if="loadingPdf" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {{ loadingPdf ? 'Φόρτωση...' : 'Προβολή PDF' }}
                  </button>
                  <span v-else class="text-sm text-slate-400">Δεν υπάρχει αρχείο</span>
                  <p v-if="pdfError" class="mt-2 text-xs text-red-500">{{ pdfError }}</p>
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
import { computed, ref } from 'vue';

import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import { requestSignedDownloadUrl } from '@/services/api/requestSignedDownloadUrl';
import { formatCurrency, formatDateTime } from '@/utils/date';

const props = defineProps<{
  isOpen: boolean;
  invoice: Invoice;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'edit'): void;
}>();

const loadingPdf = ref(false);
const pdfError = ref<string | null>(null);

const formattedUploadedAt = computed(() => formatDateTime(props.invoice.uploadedAt));
const formattedInvoiceDate = computed(() => formatDateTime(props.invoice.invoiceDate));
const formattedTotal = computed(() => formatCurrency(props.invoice.totalAmount));
const formattedUnpaid = computed(() => formatCurrency(props.invoice.unpaidAmount));
const formattedNet = computed(() => formatCurrency(props.invoice.netAmount));
const formattedVat = computed(() => formatCurrency(props.invoice.vatAmount));

const unpaidColor = computed(() =>
  (props.invoice.unpaidAmount ?? 0) > 0 ? 'text-amber-600' : 'text-emerald-600'
);

/**
 * Detects if running as an iOS PWA (standalone mode)
 */
const isIOSPwa = (): boolean => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return isIOS && isStandalone;
};

/**
 * Opens a URL. For iOS PWA, navigates directly since new tabs don't work.
 * For other platforms, uses window.open().
 */
const openUrl = (url: string) => {
  if (isIOSPwa()) {
    // iOS PWA: Navigate directly - user can swipe back
    window.location.href = url;
  } else {
    // Other platforms: Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

const openPdf = async () => {
  if (!props.invoice.filePath) return;

  loadingPdf.value = true;
  pdfError.value = null;

  try {
    // If fileUrl is already available, use it directly
    if (props.invoice.fileUrl) {
      openUrl(props.invoice.fileUrl);
      return;
    }

    // Get signed download URL from backend
    const { downloadUrl } = await requestSignedDownloadUrl({
      filePath: props.invoice.filePath,
    });

    openUrl(downloadUrl);
  } catch (error) {
    console.error('Failed to get PDF URL:', error);
    pdfError.value = 'Αποτυχία φόρτωσης του αρχείου. Παρακαλώ δοκιμάστε ξανά.';
  } finally {
    loadingPdf.value = false;
  }
};
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

/* Very small screens (≤409px): show short subtitle, hide long one */
@media (max-width: 409px) {
  .header-subtitle {
    display: none;
  }

  .header-subtitle-short {
    display: block;
  }
}

/* Screens > 409px: show long subtitle, hide short one */
@media (min-width: 410px) {
  .header-subtitle {
    display: block;
  }

  .header-subtitle-short {
    display: none;
  }
}
</style>
