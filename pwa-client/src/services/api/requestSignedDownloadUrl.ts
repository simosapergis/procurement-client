import { getAuth } from 'firebase/auth';

import { firebaseApp } from '@/services/firebase';

export interface SignedDownloadUrlResponse {
  downloadUrl: string;
  expiresAt?: string;
  expiresIn?: number;
}

interface SignedDownloadUrlRequest {
  filePath: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL ?? '';
const SIGNED_DOWNLOAD_URL_PATH = import.meta.env.VITE_SIGNED_DOWNLOAD_URL_PATH ?? 'sign/download';
const auth = getAuth(firebaseApp);

export const requestSignedDownloadUrl = async (
  payload: SignedDownloadUrlRequest
): Promise<SignedDownloadUrlResponse> => {
  if (!BASE_URL) {
    throw new Error('VITE_BASE_URL is not configured');
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be signed in to download files');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${BASE_URL}${SIGNED_DOWNLOAD_URL_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filePath: payload.filePath,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get download URL: ${errorText}`);
  }

  return response.json();
};




