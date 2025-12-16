import { getMessaging, getToken, isSupported, onMessage, type MessagePayload } from 'firebase/messaging';

import { firebaseApp, firebaseConfig } from '@/services/firebase';
import { registerFcmToken } from '@/services/api/registerFcmToken';
import { useNotificationStore } from '@/store/notificationStore';
import { useNotifications } from './useNotifications';

// Set to true to enable FCM, false to disable
const FCM_ENABLED = false;

// VAPID key for web push - generate this in Firebase Console > Project Settings > Cloud Messaging
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY ?? '';

let messagingInstance: ReturnType<typeof getMessaging> | null = null;
let initialized = false;
let swRegistration: ServiceWorkerRegistration | null = null;
let messagingSupported: boolean | null = null;

export function useFcm() {
  const notificationStore = useNotificationStore();
  const { notifySuccess, notifyError } = useNotifications();

  const checkMessagingSupport = async (): Promise<boolean> => {
    if (messagingSupported !== null) return messagingSupported;

    // Manual checks to provide detailed feedback
    const checks = {
      serviceWorker: 'serviceWorker' in navigator,
      pushManager: 'PushManager' in window,
      notification: 'Notification' in window,
      indexedDB: 'indexedDB' in window,
      https: location.protocol === 'https:' || location.hostname === 'localhost',
    };

    console.info('[FCM] Browser capability checks:', checks);

    const failedChecks = Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([name]) => name);

    if (failedChecks.length > 0) {
      console.warn('[FCM] Missing browser capabilities:', failedChecks.join(', '));
    }

    try {
      messagingSupported = await isSupported();
      if (!messagingSupported) {
        console.warn('[FCM] Firebase Messaging is not supported in this browser');
        console.warn('[FCM] Common reasons: iOS Safari, private browsing, or missing HTTPS');
      } else {
        console.info('[FCM] Firebase Messaging is supported');
      }
      return messagingSupported;
    } catch (err) {
      console.error('[FCM] Error checking messaging support:', err);
      messagingSupported = false;
      return false;
    }
  };

  const getMessagingInstance = async () => {
    if (messagingInstance) return messagingInstance;

    const supported = await checkMessagingSupport();
    if (!supported) return null;

    // Check required config values
    console.info('[FCM] Firebase config check:', {
      hasApiKey: !!firebaseConfig.apiKey,
      hasProjectId: !!firebaseConfig.projectId,
      hasAppId: !!firebaseConfig.appId,
      hasMessagingSenderId: !!firebaseConfig.messagingSenderId,
      messagingSenderId: firebaseConfig.messagingSenderId || '(empty)',
    });

    if (!firebaseConfig.messagingSenderId) {
      console.error('[FCM] messagingSenderId is required for FCM. Set VITE_FIREBASE_MESSAGING_SENDER_ID in your .env file');
      return null;
    }

    // Ensure service worker is registered first
    if (!swRegistration) {
      console.info('[FCM] Waiting for service worker registration...');
      try {
        swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        await navigator.serviceWorker.ready;
        console.info('[FCM] Service worker ready');
      } catch (swErr) {
        console.error('[FCM] Service worker registration failed:', swErr);
      }
    }

    try {
      console.info('[FCM] Firebase app name:', firebaseApp.name);
      console.info('[FCM] Firebase app options:', firebaseApp.options);
      messagingInstance = getMessaging(firebaseApp);
      console.info('[FCM] Messaging instance created successfully');
      return messagingInstance;
    } catch (err) {
      console.error('[FCM] Error initializing messaging:', err);
      if (err instanceof Error) {
        console.error('[FCM] Error details:', err.message);
        // Check if it's the "service not available" error
        if (err.message.includes('Service messaging is not available')) {
          console.error('[FCM] This error usually means:');
          console.error('  1. Browser does not support FCM (try Chrome)');
          console.error('  2. Running in private/incognito mode');
          console.error('  3. IndexedDB is not available');
        }
      }
      return null;
    }
  };

  const requestPermissionAndGetToken = async (): Promise<string | null> => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('[FCM] Notification permission denied');
        return null;
      }

      const messaging = await getMessagingInstance();
      if (!messaging) {
        console.warn('[FCM] Messaging not available');
        return null;
      }

      // Get token with the service worker registration
      const tokenOptions: { vapidKey: string; serviceWorkerRegistration?: ServiceWorkerRegistration } = {
        vapidKey: VAPID_KEY,
      };

      if (swRegistration) {
        tokenOptions.serviceWorkerRegistration = swRegistration;
      }

      const token = await getToken(messaging, tokenOptions);

      if (token) {
        console.info('[FCM] Token obtained:', token.slice(0, 20) + '...');
        notificationStore.setFcmToken(token);
        return token;
      }

      console.warn('[FCM] No token available');
      return null;
    } catch (err) {
      console.error('[FCM] Error getting token:', err);
      return null;
    }
  };

  const registerToken = async (): Promise<boolean> => {
    try {
      const token = await requestPermissionAndGetToken();
      if (!token) {
        return false;
      }

      await registerFcmToken(token);
      notificationStore.setFcmRegistered(true);
      console.info('[FCM] Token registered with backend');
      return true;
    } catch (err) {
      console.error('[FCM] Failed to register token:', err);
      notificationStore.setFcmRegistered(false);
      return false;
    }
  };

  const handleIncomingMessage = (payload: MessagePayload) => {
    console.info('[FCM] Message received:', payload);

    const data = payload.data;
    if (!data) return;

    const invoiceId = data.invoiceId;
    if (!invoiceId) return;

    // Check if it's a success or error notification
    if (data.errorMessage) {
      // Error notification
      notificationStore.addNotification({
        type: 'error',
        invoiceId,
        errorMessage: data.errorMessage,
      });
      notifyError(`Σφάλμα επεξεργασίας τιμολογίου: ${data.errorMessage}`);
    } else {
      // Success notification
      notificationStore.addNotification({
        type: 'success',
        invoiceId,
        supplierId: data.supplierId,
        supplierName: data.supplierName,
        invoiceNumber: data.invoiceNumber,
      });
      notifySuccess(
        data.supplierName
          ? `Τιμολόγιο από ${data.supplierName} επεξεργάστηκε επιτυχώς`
          : 'Τιμολόγιο επεξεργάστηκε επιτυχώς'
      );
    }
  };

  const setupMessageListener = async () => {
    if (initialized) return;

    try {
      const messaging = await getMessagingInstance();
      if (!messaging) {
        console.warn('[FCM] Cannot set up message listener - messaging not available');
        return;
      }

      onMessage(messaging, handleIncomingMessage);
      initialized = true;
      console.info('[FCM] Message listener set up');
    } catch (err) {
      console.error('[FCM] Failed to set up message listener:', err);
    }
  };

  const sendConfigToServiceWorker = (sw: ServiceWorker) => {
    // Validate config before sending
    const requiredKeys = ['apiKey', 'projectId', 'appId', 'messagingSenderId'] as const;
    const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

    if (missingKeys.length > 0) {
      console.error('[FCM] Missing Firebase config values:', missingKeys.join(', '));
      console.error('[FCM] Make sure these env variables are set: ', missingKeys.map((k) => `VITE_FIREBASE_${k.toUpperCase()}`).join(', '));
      return;
    }

    sw.postMessage({
      type: 'FIREBASE_CONFIG',
      config: firebaseConfig,
    });
    console.info('[FCM] Config sent to service worker');
  };

  const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
    try {
      // Register the Firebase messaging service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/',
      });

      // Wait for the service worker to be ready
      await navigator.serviceWorker.ready;

      // Send config to whichever worker is available
      const sw = registration.active || registration.installing || registration.waiting;
      if (sw) {
        if (sw.state === 'activated') {
          sendConfigToServiceWorker(sw);
        } else {
          // Wait for the service worker to activate
          sw.addEventListener('statechange', () => {
            if (sw.state === 'activated') {
              sendConfigToServiceWorker(sw);
            }
          });
        }
      }

      // Also send to the controlling worker if different
      if (navigator.serviceWorker.controller) {
        sendConfigToServiceWorker(navigator.serviceWorker.controller);
      }

      console.info('[FCM] Service worker registered');
      swRegistration = registration;
      return registration;
    } catch (err) {
      console.error('[FCM] Service worker registration failed:', err);
      return null;
    }
  };

  const initializeFcm = async (): Promise<boolean> => {
    // FCM is disabled - set FCM_ENABLED = true to enable
    if (!FCM_ENABLED) {
      console.info('[FCM] FCM is disabled. Set FCM_ENABLED = true in useFcm.ts to enable.');
      return false;
    }

    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.warn('[FCM] Browser does not support notifications');
      return false;
    }

    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) {
      console.warn('[FCM] Service workers not supported');
      return false;
    }

    // Check if Firebase Messaging is supported
    const supported = await checkMessagingSupport();
    if (!supported) {
      console.warn('[FCM] Firebase Messaging not supported - skipping initialization');
      return false;
    }

    // Validate required config
    if (!firebaseConfig.messagingSenderId) {
      console.error('[FCM] Missing VITE_FIREBASE_MESSAGING_SENDER_ID - FCM will not work');
      return false;
    }

    if (!VAPID_KEY) {
      console.error('[FCM] Missing VITE_FIREBASE_VAPID_KEY - FCM will not work');
      console.info('[FCM] Generate VAPID key in Firebase Console → Project Settings → Cloud Messaging → Web Push certificates');
      return false;
    }

    // Register the FCM service worker
    await registerServiceWorker();

    await setupMessageListener();
    const registered = await registerToken();
    return registered;
  };

  return {
    initializeFcm,
    registerToken,
    setupMessageListener,
    fcmToken: notificationStore.fcmToken,
    fcmRegistered: notificationStore.fcmRegistered,
  };
}

