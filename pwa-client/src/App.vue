<template>
  <div class="flex min-h-screen flex-col bg-slate-100">
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <RouterLink to="/" class="text-lg font-semibold text-primary-600">MyLogia</RouterLink>

        <!-- Authenticated nav -->
        <nav v-if="isAuthenticated" class="flex items-center gap-4 text-sm font-medium text-slate-600">
          <RouterLink to="/" class="hover:text-primary-600">Σύνοψη</RouterLink>
          <RouterLink to="/upload" class="hover:text-primary-600">Σάρωση</RouterLink>
          <RouterLink to="/suppliers" class="hover:text-primary-600">Προμηθευτές</RouterLink>

          <!-- Notifications -->
          <RouterLink to="/notifications" class="relative hover:text-primary-600">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span
              v-if="unreadCount > 0"
              class="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
            >
              {{ unreadCount > 99 ? '99+' : unreadCount }}
            </span>
          </RouterLink>

          <!-- User menu -->
          <div class="relative ml-2">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 transition hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              @click="userMenuOpen = !userMenuOpen"
            >
              {{ userInitial }}
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="userMenuOpen"
                class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white py-2 shadow-lg ring-1 ring-black/5"
                @click.stop
              >
                <div class="border-b border-slate-100 px-4 py-3">
                  <p class="text-xs text-slate-400">Συνδεδεμένος ως</p>
                  <p class="truncate text-sm font-medium text-slate-900">{{ userEmail }}</p>
                </div>
                <button
                  type="button"
                  class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                  @click="handleLogout"
                >
                  <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Αποσύνδεση
                </button>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Unauthenticated nav -->
        <nav v-else class="flex items-center gap-4 text-sm font-medium text-slate-600">
          <RouterLink to="/login" class="rounded-xl bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Σύνδεση
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Click outside to close menu -->
    <div v-if="userMenuOpen" class="fixed inset-0 z-40" @click="userMenuOpen = false" />
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
import { computed, ref, watch } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useNotifications } from '@/composables/useNotifications';
import { useNotificationStore } from '@/store/notificationStore';
import { useAuth } from '@/composables/useAuth';
import { useFcm } from '@/composables/useFcm';

const router = useRouter();
const { toasts, dismiss } = useNotifications();
const notificationStore = useNotificationStore();
const { unreadCount } = storeToRefs(notificationStore);
const { user, isAuthenticated, logout } = useAuth();
const { initializeFcm } = useFcm();

// User menu state
const userMenuOpen = ref(false);

const userEmail = computed(() => user.value?.email ?? '');
const userInitial = computed(() => {
  const email = userEmail.value;
  if (!email) return '?';
  return email.charAt(0).toUpperCase();
});

const handleLogout = async () => {
  userMenuOpen.value = false;
  await logout();
  router.push('/login');
};

// Initialize FCM when user becomes authenticated
watch(
  isAuthenticated,
  async (authenticated) => {
    if (authenticated) {
      await initializeFcm();
    }
  },
  { immediate: true }
);

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
