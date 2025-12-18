import { getAuth } from 'firebase/auth';

import { firebaseApp } from '@/services/firebase';

export interface SignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  invoiceId: string;
  bucket?: string;
  objectName?: string;
  headers?: Record<string, string>;
  expiresAt?: string;
  expiresIn?: number;
  pageNumber: number;
  totalPages?: number;
}

interface SignedUrlRequest {
  filename: string;
  contentType: string;
  pageNumber: number;
  totalPages?: number;
  invoiceId?: string;
  folder?: string;
}

const endpoint = import.meta.env.VITE_SIGNED_UPLOAD_URL_ENDPOINT ?? '';
const defaultFolder = import.meta.env.VITE_FIREBASE_BUCKET_FOLDER ?? 'uploads';
const auth = getAuth(firebaseApp);

export const requestSignedUrl = async (payload: SignedUrlRequest): Promise<SignedUrlResponse> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be signed in to request uploads');
  }

  const token = await user.getIdToken();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filename: payload.filename,
      contentType: payload.contentType,
      folder: payload.folder ?? defaultFolder,
      pageNumber: payload.pageNumber,
      ...(payload.totalPages ? { totalPages: payload.totalPages } : {}),
      ...(payload.invoiceId ? { invoiceId: payload.invoiceId } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to request signed URL');
  }

  return response.json();
};
