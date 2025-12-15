<template>
  <div class="flex min-h-screen flex-col bg-slate-100">
    <header class="bg-white shadow-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <RouterLink to="/" class="text-lg font-semibold text-primary-600">MyLogia</RouterLink>
        <nav class="flex gap-4 text-sm font-medium text-slate-600">
          <RouterLink to="/" class="hover:text-primary-600">Σύνοψη</RouterLink>
          <RouterLink to="/upload" class="hover:text-primary-600">Σάρωση</RouterLink>
          <RouterLink to="/suppliers" class="hover:text-primary-600">Προμηθευτές</RouterLink>
        </nav>
      </div>
    </header>
    <main class="mx-auto flex w-full max-w-6xl flex-1 px-6 py-10">
      <RouterView />
    </main>
    <div class="pointer-events-none fixed inset-x-0 top-4 flex justify-center">
      <transition-group name="toast" tag="div" class="space-y-2">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-2xl bg-slate-900/90 px-5 py-3 text-sm text-white shadow-lg"
          :class="toastClasses(toast.type)"
          @click="dismiss(toast.id)"
        >
          {{ toast.message }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

import { useNotifications } from '@/composables/useNotifications';

const { toasts, dismiss } = useNotifications();

const toastClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-emerald-500/90';
    case 'error':
      return 'bg-rose-500/90';
    default:
      return 'bg-slate-900/90';
  }
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
