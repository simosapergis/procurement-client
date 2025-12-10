<template>
  <section class="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
    <h2 class="text-2xl font-semibold text-slate-900">Sign in</h2>
    <p class="mb-6 mt-2 text-sm text-slate-500">Use your procurement workspace credentials.</p>
    <form class="space-y-5" @submit.prevent="handleSubmit">
      <label class="block space-y-2 text-sm font-medium text-slate-600">
        Email
        <input
          v-model="state.email"
          type="email"
          required
          class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
        />
      </label>
      <label class="block space-y-2 text-sm font-medium text-slate-600">
        Password
        <input
          v-model="state.password"
          type="password"
          required
          class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
        />
      </label>
      <button :disabled="state.loading" type="submit" class="w-full rounded-xl bg-primary-600 px-4 py-3 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60">
        {{ state.loading ? 'Signing in...' : 'Continue' }}
      </button>
      <p v-if="state.error" class="text-sm text-rose-600">{{ state.error }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAuth } from '@/composables/useAuth';
import { useNotifications } from '@/composables/useNotifications';

const { loginWithEmail } = useAuth();
const { notifySuccess, notifyError } = useNotifications();
const route = useRoute();
const router = useRouter();

const state = reactive({
  email: '',
  password: '',
  loading: false,
  error: null as string | null,
});

const handleSubmit = async () => {
  state.loading = true;
  state.error = null;
  try {
    await loginWithEmail(state.email, state.password);
    notifySuccess('Signed in successfully');
    const redirectPath = (route.query.redirect as string) || '/';
    router.replace(redirectPath);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to sign in';
    state.error = message;
    notifyError(message);
  } finally {
    state.loading = false;
  }
};
</script>
