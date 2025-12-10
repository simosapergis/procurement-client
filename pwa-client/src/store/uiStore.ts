import { defineStore } from 'pinia';

import type { NotificationMessage } from '@/services/notifications';

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: [] as NotificationMessage[],
  }),
  actions: {
    pushToast(toast: NotificationMessage) {
      this.toasts.push(toast);
      const id = toast.id;
      const timeout = toast.timeout ?? 4000;
      if (timeout > 0) {
        setTimeout(() => {
          this.toasts = this.toasts.filter((t) => t.id !== id);
        }, timeout);
      }
    },
    removeToast(id?: string) {
      if (!id) return;
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
