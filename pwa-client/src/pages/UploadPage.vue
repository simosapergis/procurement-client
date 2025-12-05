<template>
  <section class="grid w-full gap-6 lg:grid-cols-[2fr,1fr]">
    <div class="rounded-3xl bg-white p-6 shadow-lg">
      <header class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-slate-900">Upload invoice</h2>
          <p class="text-sm text-slate-500">Capture every page, upload on the spot.</p>
        </div>
        <StatusBadge :status="statusBadge" />
      </header>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="text-sm font-medium text-slate-600">
          Total pages
          <input
            type="number"
            min="1"
            class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
            :value="totalPages ?? ''"
            @input="handleTotalPagesInput"
          />
        </label>
        <label class="text-sm font-medium text-slate-600">
          Existing invoice ID (optional)
          <input
            v-model.trim="existingInvoiceId"
            type="text"
            placeholder="Resume an existing upload"
            class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
          />
        </label>
      </div>

      <p v-if="activeInvoiceId" class="mt-2 text-xs uppercase tracking-wide text-emerald-600">
        Active invoice ID: {{ activeInvoiceId }}
      </p>

      <div class="mt-6 space-y-3">
        <CameraButton :disabled="!canUseCamera" @select="handleSelection">
          {{ canAddPages ? 'Capture next page' : 'All pages captured' }}
        </CameraButton>
        <p class="text-sm text-slate-500">{{ remainingPagesMessage }}</p>
      </div>

      <div v-if="pages.length" class="mt-6 rounded-2xl border border-slate-200">
        <ul class="divide-y divide-slate-100">
          <li v-for="page in pages" :key="page.id" class="flex items-center justify-between px-4 py-3">
            <div>
              <p class="text-sm font-semibold text-slate-800">
                Page {{ page.pageNumber }} — {{ page.name }}
              </p>
              <p class="text-xs text-slate-400">
                {{ page.result?.objectName ?? 'Pending upload' }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="pageStatusClasses(page.status)"
              >
                {{ formatPageStatus(page.status) }}
              </span>
              <button
                v-if="page.status === 'pending'"
                class="text-xs font-semibold text-rose-500 hover:text-rose-600"
                type="button"
                @click="removePage(page.id)"
              >
                Remove
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          class="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="!hasPendingUploads || isBusy"
          @click="startUpload"
        >
          {{ statusLabel }}
        </button>
        <button
          type="button"
          class="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="isBusy"
          @click="resetQueue"
        >
          Reset
        </button>
        <p class="text-xs text-slate-500 sm:ml-auto">Progress: {{ overallProgress }}%</p>
      </div>

      <Loader v-if="isBusy" :label="statusMessage" />
      <p v-if="error" class="mt-2 text-sm text-rose-600">{{ error }}</p>
    </div>

    <div class="space-y-4">
      <div class="rounded-3xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
        <p class="font-semibold text-slate-700">Flow outline</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Collect total pages (and existing ID if resuming).</li>
          <li>Capture page → run quality checks.</li>
          <li>Request signed upload URL with page metadata.</li>
          <li>Upload bytes directly to Cloud Storage.</li>
          <li>Repeat for remaining pages; backend processes results.</li>
        </ul>
      </div>

      <div class="rounded-3xl bg-white p-4 shadow-sm">
        <p class="font-semibold text-slate-700">Recent uploads</p>
        <p v-if="!uploadsLog.length" class="text-sm text-slate-500">No uploads yet.</p>
        <ul v-else class="mt-3 space-y-2 text-xs text-slate-500">
          <li
            v-for="log in uploadsLog.slice(-5).reverse()"
            :key="`${log.invoiceId}-${log.pageNumber}-${log.objectName}`"
            class="rounded-2xl border border-slate-100 p-3"
          >
            <div class="flex items-center justify-between text-slate-600">
              <span class="font-semibold">Invoice {{ log.invoiceId }}</span>
              <span>Page {{ log.pageNumber }}</span>
            </div>
            <p class="mt-1 break-all text-[11px] text-slate-400">
              {{ log.objectName ?? log.fileUrl }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CameraButton from '@/components/CameraButton.vue';
import Loader from '@/components/Loader.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { useInvoiceUpload } from '@/composables/useInvoiceUpload';

const {
  addPage,
  upload,
  removePage,
  resetQueue,
  setTotalPages,
  status,
  error,
  totalPages,
  existingInvoiceId,
  activeInvoiceId,
  pages,
  uploadsLog,
  canAddPages,
  remainingPages,
  overallProgress,
  hasPendingUploads,
} = useInvoiceUpload();

const handleSelection = async (file: File) => {
  await addPage(file);
};

const startUpload = async () => {
  await upload();
};

const handleTotalPagesInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber;
  setTotalPages(value);
};

const isBusy = computed(() => ['validating', 'uploading'].includes(status.value));
const canUseCamera = computed(() => canAddPages.value && !isBusy.value);

const statusBadge = computed(() => {
  switch (status.value) {
    case 'completed':
      return 'uploaded';
    case 'error':
      return 'failed';
    case 'idle':
      return 'pending';
    default:
      return 'processing';
  }
});

const statusLabel = computed(() => {
  if (status.value === 'uploading') return 'Uploading...';
  if (status.value === 'validating') return 'Validating...';
  return 'Upload pending pages';
});

const statusMessage = computed(() => {
  switch (status.value) {
    case 'validating':
      return 'Checking clarity and orientation...';
    case 'uploading':
      return 'Uploading page to the signed URL...';
    case 'completed':
      return 'All pages uploaded. Awaiting backend processing.';
    case 'error':
      return 'Something went wrong. Fix the issue and retry.';
    default:
      return 'Capture pages and upload as you go.';
  }
});

const remainingPagesMessage = computed(() => {
  if (!totalPages.value) return 'Set the total number of pages to begin.';
  if (remainingPages.value <= 0) return 'All pages captured. Upload to finish.';
  return `${remainingPages.value} page${remainingPages.value > 1 ? 's' : ''} left to capture.`;
});

const pageStatusClasses = (pageStatus: string) => {
  switch (pageStatus) {
    case 'uploaded':
      return 'bg-emerald-100 text-emerald-700';
    case 'uploading':
      return 'bg-sky-100 text-sky-700';
    case 'validating':
      return 'bg-amber-100 text-amber-700';
    case 'error':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

const formatPageStatus = (pageStatus: string) => {
  switch (pageStatus) {
    case 'uploaded':
      return 'Uploaded';
    case 'uploading':
      return 'Uploading';
    case 'validating':
      return 'Validating';
    case 'error':
      return 'Error';
    default:
      return 'Pending';
  }
};
</script>
