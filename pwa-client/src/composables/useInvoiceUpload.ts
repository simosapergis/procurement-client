import { ref } from 'vue';

import { UploadFlow } from '@/modules/invoices/UploadFlow';
import { detectQuality } from '@/modules/invoices/DetectQuality';
import { generateInvoiceId } from '@/modules/invoices/GenerateUUID';
import { mapInvoice, type Invoice } from '@/modules/invoices/InvoiceMapper';
import { detectSupplier } from '@/modules/suppliers/DetectSupplier';
import { requestSignedUrl } from '@/services/api/requestSignedUrl';
import { useFirestore } from './useFirestore';
import { useInvoiceStatus } from './useInvoiceStatus';
import { useNotifications } from './useNotifications';

const uploadFlow = new UploadFlow({
  detectQuality,
  generateInvoiceId,
  detectSupplier,
  mapInvoice,
  requestSignedUrl,
});

type UploadState = 'idle' | 'validating' | 'uploading' | 'completed' | 'error';

export function useInvoiceUpload() {
  const selectedFile = ref<File | null>(null);
  const selectedFileName = ref('');
  const status = ref<UploadState>('idle');
  const progress = ref(0);
  const error = ref<string | null>(null);
  const currentInvoice = ref<Invoice | null>(null);

  const { saveInvoiceRecord } = useFirestore();
  const { upsertInvoice } = useInvoiceStatus();
  const { notifySuccess, notifyError } = useNotifications();

  const selectFile = (file: File) => {
    selectedFile.value = file;
    selectedFileName.value = file.name;
    currentInvoice.value = null;
    status.value = 'idle';
    progress.value = 0;
    error.value = null;
  };

  const upload = async () => {
    if (!selectedFile.value) {
      error.value = 'Select a file first';
      return;
    }
    status.value = 'validating';
    progress.value = 10;
    try {
      const invoice = await uploadFlow.run(selectedFile.value, (value) => {
        progress.value = Math.round(value);
        status.value = value >= 60 ? 'uploading' : 'validating';
      });
      status.value = 'uploading';
      progress.value = 90;
      await saveInvoiceRecord(invoice);
      upsertInvoice(invoice);
      progress.value = 100;
      status.value = 'completed';
      currentInvoice.value = invoice;
      error.value = null;
      notifySuccess('Invoice uploaded successfully');
      selectedFile.value = null;
      selectedFileName.value = '';
      return invoice;
    } catch (err) {
      status.value = 'error';
      const message = err instanceof Error ? err.message : 'Upload failed';
      error.value = message;
      notifyError(message);
      throw err;
    }
  };

  return {
    selectFile,
    upload,
    status,
    progress,
    error,
    selectedFileName,
    currentInvoice,
  };
}
