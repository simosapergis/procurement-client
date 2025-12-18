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

const endpoint = import.meta.env.VITE_SIGNED_DOWNLOAD_URL_ENDPOINT ?? '';
const auth = getAuth(firebaseApp);

export const requestSignedDownloadUrl = async (
  payload: SignedDownloadUrlRequest
): Promise<SignedDownloadUrlResponse> => {
  if (!endpoint) {
    throw new Error('VITE_SIGNED_DOWNLOAD_URL_ENDPOINT is not configured');
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be signed in to download files');
  }

  const token = await user.getIdToken();
  const response = await fetch(endpoint, {
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




