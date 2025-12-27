<template>
  <div class="flex min-h-screen flex-col bg-slate-100">
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="app-header mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
        <RouterLink to="/" class="app-logo text-base font-semibold text-primary-600 sm:text-lg">MyLogia Demo</RouterLink>

        <!-- Desktop Navigation (hidden on mobile) -->
        <nav v-if="isAuthenticated" class="hidden items-center gap-4 text-sm font-medium text-slate-600 sm:flex">
          <RouterLink to="/" class="nav-link hover:text-primary-600">Σύνοψη</RouterLink>
          <RouterLink to="/invoices" class="nav-link hover:text-primary-600">Τιμολόγια</RouterLink>
          <RouterLink to="/upload" class="nav-link hover:text-primary-600">Σάρωση</RouterLink>
          <RouterLink to="/suppliers" class="nav-link hover:text-primary-600">Προμηθευτές</RouterLink>

          <!-- Notification Bell (desktop) -->
          <RouterLink
            to="/notifications"
            class="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span
              v-if="unreadCount > 0"
              class="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </RouterLink>

          <!-- User menu (desktop) -->
          <div class="relative ml-1">
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

        <!-- Mobile: Right side actions -->
        <div v-if="isAuthenticated" class="flex items-center gap-1 sm:hidden">
          <!-- Scan/Upload shortcut (mobile) -->
          <RouterLink
            to="/upload"
            class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
            :class="{ 'bg-primary-50 text-primary-600': $route.path === '/upload' }"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </RouterLink>

          <!-- Notification Bell (mobile) -->
          <RouterLink
            to="/notifications"
            class="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span
              v-if="unreadCount > 0"
              class="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </RouterLink>

          <!-- Hamburger Menu Button -->
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
            @click="sidebarOpen = true"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <!-- Unauthenticated nav -->
        <nav v-if="!isAuthenticated" class="flex items-center gap-4 text-sm font-medium text-slate-600">
          <RouterLink to="/login" class="rounded-xl bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Σύνδεση
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Mobile Sidebar Overlay -->
    <Teleport to="body">
      <Transition name="sidebar-backdrop">
        <div
          v-if="sidebarOpen"
          class="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm sm:hidden"
          @click="sidebarOpen = false"
        />
      </Transition>

      <!-- Mobile Sidebar Panel -->
      <Transition name="sidebar">
        <aside
          v-if="sidebarOpen"
          class="fixed inset-y-0 right-0 z-[70] flex w-72 flex-col bg-white shadow-2xl sm:hidden"
        >
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <span class="text-lg font-semibold text-primary-600">Μενού</span>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              @click="sidebarOpen = false"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- User Info -->
          <div class="border-b border-slate-100 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-700">
                {{ userInitial }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs text-slate-400">Συνδεδεμένος ως</p>
                <p class="truncate text-sm font-medium text-slate-900">{{ userEmail }}</p>
              </div>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="flex-1 overflow-y-auto px-3 py-4">
            <RouterLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              :class="{ 'bg-primary-50 text-primary-600': $route.path === link.to }"
              @click="sidebarOpen = false"
            >
              <component :is="link.icon" class="h-5 w-5" />
              {{ link.label }}
            </RouterLink>

            <!-- Notifications link in sidebar -->
            <RouterLink
              to="/notifications"
              class="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              :class="{ 'bg-primary-50 text-primary-600': $route.path === '/notifications' }"
              @click="sidebarOpen = false"
            >
              <div class="relative">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span
                  v-if="unreadCount > 0"
                  class="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500"
                />
              </div>
              Ειδοποιήσεις
              <span v-if="unreadCount > 0" class="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600">
                {{ unreadCount }}
              </span>
            </RouterLink>
          </nav>

          <!-- Logout Button -->
          <div class="border-t border-slate-100 p-4">
            <button
              type="button"
              class="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]"
              @click="handleLogout"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Αποσύνδεση
            </button>
          </div>
        </aside>
      </Transition>
    </Teleport>

    <!-- Click outside to close desktop menu -->
    <div v-if="userMenuOpen" class="fixed inset-0 z-40" @click="userMenuOpen = false" />

    <main class="mx-auto flex w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
      <RouterView />
    </main>

    <!-- Toast Notifications -->
    <div class="pointer-events-none fixed inset-x-0 top-16 z-[100] flex justify-center sm:top-20">
      <transition-group name="toast" tag="div" class="space-y-2 px-4">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto max-w-sm rounded-2xl px-5 py-3 text-sm text-white shadow-xl"
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
import { computed, h, onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useNotifications } from '@/composables/useNotifications';
import { useNotificationStore } from '@/store/notificationStore';
import { useAuth } from '@/composables/useAuth';
import { useInvoiceNotifications } from '@/composables/useInvoiceNotifications';

const router = useRouter();
const { toasts, dismiss } = useNotifications();
const notificationStore = useNotificationStore();
const { unreadCount } = storeToRefs(notificationStore);
const { user, isAuthenticated, logout } = useAuth();
const { initializeNotifications } = useInvoiceNotifications();

// Menu states
const userMenuOpen = ref(false);
const sidebarOpen = ref(false);

// Initialize notification listener
onMounted(() => {
  initializeNotifications();
});

// Navigation icons as functional components
const HomeIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
]);

const InvoicesIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
]);

const ScanIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 13a3 3 0 11-6 0 3 3 0 016 0z' })
]);

const SuppliersIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
]);

const navLinks = [
  { to: '/', label: 'Σύνοψη', icon: HomeIcon },
  { to: '/invoices', label: 'Τιμολόγια', icon: InvoicesIcon },
  { to: '/upload', label: 'Σάρωση', icon: ScanIcon },
  { to: '/suppliers', label: 'Προμηθευτές', icon: SuppliersIcon },
];

const userEmail = computed(() => user.value?.email ?? '');
const userInitial = computed(() => {
  const email = userEmail.value;
  if (!email) return '?';
  return email.charAt(0).toUpperCase();
});

const handleLogout = async () => {
  userMenuOpen.value = false;
  sidebarOpen.value = false;
  await logout();
  router.push('/login');
};

// Close sidebar on route change
watch(() => router.currentRoute.value.path, () => {
  sidebarOpen.value = false;
});


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
/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Sidebar backdrop animation */
.sidebar-backdrop-enter-active,
.sidebar-backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.sidebar-backdrop-enter-from,
.sidebar-backdrop-leave-to {
  opacity: 0;
}

/* Sidebar slide animation (right to left) */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
}
</style>
