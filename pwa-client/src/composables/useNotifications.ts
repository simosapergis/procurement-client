import { subscribe, notify } from '@/services/notifications';
import { useUiStore } from '@/store/uiStore';

let unsubscribe: (() => void) | null = null;

export function useNotifications() {
  const uiStore = useUiStore();

  if (!unsubscribe) {
    unsubscribe = subscribe((payload) => {
      uiStore.pushToast(payload);
    });
  }

  const notifySuccess = (message: string) => notify({ message, type: 'success' });
  const notifyError = (message: string) => notify({ message, type: 'error' });
  const notifyInfo = (message: string) => notify({ message, type: 'info' });

  return { notifySuccess, notifyError, notifyInfo, toasts: uiStore.toasts, dismiss: uiStore.removeToast };
}
