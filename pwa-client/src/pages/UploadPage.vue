<template>
  <section class="grid w-full gap-6 lg:grid-cols-[2fr,1fr]">
    <div class="rounded-3xl bg-white p-6 shadow-lg">
      <header class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-slate-900">Upload invoice</h2>
      <StatusBadge :status="statusBadge" />
      </header>
      <CameraButton @select="handleSelection" />
      <p v-if="selectedFileName" class="mt-4 text-sm text-slate-500">Selected: {{ selectedFileName }}</p>
      <div class="mt-6 flex items-center gap-4">
        <button
          type="button"
          class="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="!canUpload"
          @click="startUpload"
        >
          {{ statusLabel }}
        </button>
        <p v-if="progress > 0" class="text-sm text-slate-500">Progress: {{ progress }}%</p>
      </div>
      <Loader v-if="isBusy" :label="statusMessage" />
      <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
    </div>
    <div class="space-y-4">
      <InvoiceCard v-if="currentInvoice" :invoice="currentInvoice" />
      <div class="rounded-3xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
        <p class="font-semibold text-slate-700">Flow outline</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Validate clarity &amp; orientation</li>
          <li>Detect supplier hints</li>
          <li>Request backend signed URL</li>
          <li>Upload directly from device</li>
          <li>Persist metadata in Firestore</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CameraButton from '@/components/CameraButton.vue';
import InvoiceCard from '@/components/InvoiceCard.vue';
import Loader from '@/components/Loader.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { useInvoiceUpload } from '@/composables/useInvoiceUpload';

const {
  selectFile,
  upload,
  status,
  error,
  progress,
  currentInvoice,
  selectedFileName,
} = useInvoiceUpload();

const handleSelection = (file: File) => selectFile(file);

const startUpload = async () => {
  await upload();
};

const canUpload = computed(
  () => Boolean(selectedFileName.value) && !['uploading', 'validating'].includes(status.value)
);
const isBusy = computed(() => ['validating', 'uploading'].includes(status.value));
const statusBadge = computed(() => {
  if (status.value === 'completed') return 'uploaded';
  if (status.value === 'error') return 'failed';
  if (status.value === 'idle') return 'pending';
  return 'processing';
});
const statusLabel = computed(() => {
  if (status.value === 'uploading') return 'Uploading...';
  if (status.value === 'validating') return 'Validating...';
  return 'Upload now';
});
const statusMessage = computed(() => {
  switch (status.value) {
    case 'validating':
      return 'Checking quality...';
    case 'uploading':
      return 'Uploading invoice to signed URL...';
    case 'completed':
      return 'Upload complete';
    case 'error':
      return 'Something went wrong';
    default:
      return 'Ready to upload';
  }
});
</script>
