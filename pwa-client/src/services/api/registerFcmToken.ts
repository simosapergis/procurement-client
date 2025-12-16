import { getAuth } from 'firebase/auth';

import { firebaseApp } from '@/services/firebase';

const endpoint = 'https://us-central1-level-approach-479119-b3.cloudfunctions.net/registerFcmToken';
const auth = getAuth(firebaseApp);

export interface RegisterTokenRequest {
  token: string;
  platform: 'web' | 'ios' | 'android';
}

export interface RegisterTokenResponse {
  success: boolean;
  message?: string;
}

export const registerFcmToken = async (fcmToken: string): Promise<RegisterTokenResponse> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Πρέπει να είστε συνδεδεμένος για να εγγραφείτε σε ειδοποιήσεις');
  }

  const idToken = await user.getIdToken();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: fcmToken,
      platform: 'web',
    }),
  });

  if (!response.ok) {
    throw new Error('Αποτυχία εγγραφής για ειδοποιήσεις');
  }

  return response.json();
};


