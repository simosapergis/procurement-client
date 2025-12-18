import { initializeApp } from 'firebase/app';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
if (!storageBucket) {
  throw new Error('VITE_FIREBASE_STORAGE_BUCKET environment variable is not set');
}

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
};

export const firebaseApp = initializeApp(firebaseConfig);

// Lazy-initialized storage instance
let _storage: FirebaseStorage | null = null;

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!_storage) {
    try {
      _storage = getStorage(firebaseApp);
    } catch (error) {
      console.error("Error initializing Firebase storage:", error);
      throw error;
    }
  }
  return _storage;
};
