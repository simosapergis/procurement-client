import { computed, ref } from 'vue';

import { UploadFlow, type UploadPageResult } from '@/modules/invoices/UploadFlow';
import { detectQuality } from '@/modules/invoices/DetectQuality';
import { requestSignedUrl } from '@/services/api/requestSignedUrl';
import type { ImageQualityReport } from '@/utils/image';
import { createUUID } from '@/utils/uuid';
import { useNotifications } from './useNotifications';

const uploadFlow = new UploadFlow({
  detectQuality,
  requestSignedUrl,
});

type UploadState = 'idle' | 'validating' | 'ready' | 'uploading' | 'completed' | 'error';
type PageStatus = 'pending' | 'validating' | 'uploading' | 'uploaded' | 'error';

interface PageEntry {
  id: string;
  file: File;
  name: string;
  pageNumber: number;
  status: PageStatus;
  progress: number;
  error?: string;
  quality?: ImageQualityReport;
  result?: UploadPageResult;
}

export function useInvoiceUpload() {
  const totalPages = ref<number | null>(null);
  const existingInvoiceId = ref('');
  const activeInvoiceId = ref<string | null>(null);
  const status = ref<UploadState>('idle');
  const error = ref<string | null>(null);
  const pages = ref<PageEntry[]>([]);
  const uploadsLog = ref<UploadPageResult[]>([]);

  const { notifySuccess, notifyError } = useNotifications();

  const canAddPages = computed(() => {
    if (!totalPages.value) return false;
    return pages.value.length < totalPages.value;
  });

  const remainingPages = computed(() => {
    if (!totalPages.value) return 0;
    return Math.max(totalPages.value - pages.value.length, 0);
  });

  const completedPages = computed(() => pages.value.filter((page) => page.status === 'uploaded').length);

  const overallProgress = computed(() => {
    if (!totalPages.value || totalPages.value === 0) return 0;
    return Math.min(100, Math.round((completedPages.value / totalPages.value) * 100));
  });

  const pendingPages = computed(() => pages.value.filter((page) => page.status === 'pending'));
  const hasPendingUploads = computed(() => pendingPages.value.length > 0);

  const setTotalPages = (value: number | null) => {
    if (value !== null && value < 1) {
      totalPages.value = null;
      return;
    }

    if (value !== null && Number.isFinite(value) && value < pages.value.length) {
      notifyError('Total pages cannot be less than captured pages.');
      return;
    }
    totalPages.value = value;
  };

  const resetQueue = () => {
    pages.value = [];
    status.value = 'idle';
    error.value = null;
    totalPages.value = null;
    existingInvoiceId.value = '';
    activeInvoiceId.value = null;
  };

  const addPage = async (file: File) => {
    if (!totalPages.value) {
      const message = 'Set the total number of pages before capturing.';
      error.value = message;
      notifyError(message);
      return;
    }

    if (!canAddPages.value) {
      const message = 'You have already added all pages for this invoice.';
      error.value = message;
      notifyError(message);
      return;
    }

    status.value = 'validating';
    try {
      const quality = await detectQuality(file);
      if (!quality.accepted) {
        throw new Error(quality.reasons[0] ?? 'Quality check failed. Please retake the photo.');
      }

      const pageNumber = pages.value.length + 1;
      pages.value = [
        ...pages.value,
        {
          id: createUUID(),
          file,
          name: file.name || `Page ${pageNumber}`,
          pageNumber,
          status: 'pending',
          progress: 0,
          quality,
        },
      ];

      status.value = 'ready';
      error.value = null;
      notifySuccess(`Page ${pageNumber} validated. Ready to upload.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to validate the photo. Try again.';
      status.value = 'idle';
      error.value = message;
      notifyError(message);
    }
  };

  const removePage = (id: string) => {
    const index = pages.value.findIndex((page) => page.id === id);
    if (index === -1) return;
    pages.value.splice(index, 1);
    pages.value = pages.value.map((page, idx) => ({
      ...page,
      pageNumber: idx + 1,
    }));
  };

  const upload = async () => {
    if (!pages.value.length) {
      error.value = 'Capture at least one page before uploading.';
      notifyError(error.value);
      return;
    }

    if (!totalPages.value) {
      error.value = 'Specify the total number of pages.';
      notifyError(error.value);
      return;
    }

    const invoiceIdSeed = existingInvoiceId.value.trim() || activeInvoiceId.value || null;
    let invoiceId = invoiceIdSeed;

    status.value = 'uploading';
    error.value = null;

    for (const page of pages.value) {
      if (page.status === 'uploaded') continue;

      page.status = 'uploading';
      page.progress = 0;

      try {
        const includeTotalPages = !invoiceId && !invoiceIdSeed && page.pageNumber === 1 ? totalPages.value : undefined;
        const result = await uploadFlow.uploadPage({
          file: page.file,
          pageNumber: page.pageNumber,
          totalPages: includeTotalPages ?? undefined,
          invoiceId: invoiceId ?? invoiceIdSeed ?? undefined,
          quality: page.quality,
          onProgress(progress) {
            page.progress = Math.round(progress);
          },
        });

        invoiceId = result.invoiceId;
        activeInvoiceId.value = result.invoiceId;
        page.status = 'uploaded';
        page.progress = 100;
        page.result = result;
        uploadsLog.value.push(result);

        notifySuccess(`Uploaded page ${result.pageNumber} of ${result.totalPages ?? totalPages.value}.`);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed';
        page.status = 'error';
        page.error = message;
        status.value = 'error';
        error.value = message;
        notifyError(message);
        return;
      }
    }

    if (completedPages.value === totalPages.value) {
      status.value = 'completed';
      notifySuccess('All pages uploaded. Processing will continue in the background.');
      resetQueue();
    } else {
      status.value = 'ready';
    }
  };

  return {
    status,
    error,
    totalPages,
    existingInvoiceId,
    activeInvoiceId,
    pages,
    uploadsLog,
    canAddPages,
    remainingPages,
    completedPages,
    overallProgress,
    hasPendingUploads,
    addPage,
    removePage,
    upload,
    setTotalPages,
    resetQueue,
  };
}
