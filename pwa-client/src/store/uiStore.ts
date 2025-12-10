import { defineStore } from 'pinia';

import type { NotificationMessage } from '@/services/notifications';

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: [] as NotificationMessage[],
  }),
  actions: {
    pushToast(toast: NotificationMessage) {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast.id), toast.timeout);
    },
    removeToast(id?: string) {
      if (!id) return;
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
