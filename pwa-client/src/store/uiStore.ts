import { defineStore } from 'pinia';

import type { NotificationMessage } from '@/services/notifications';

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: [] as NotificationMessage[],
  }),
  actions: {
    pushToast(toast: NotificationMessage) {
      const duration = Number.isFinite(toast.timeout) ? Number(toast.timeout) : 5000;
      const normalized: NotificationMessage = {
        ...toast,
        timeout: duration > 0 ? duration : 0,
      };
      this.toasts.push(normalized);
      if (normalized.timeout > 0) {
        setTimeout(() => this.removeToast(normalized.id), normalized.timeout);
      }
    },
    removeToast(id?: string) {
      if (!id) return;
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
