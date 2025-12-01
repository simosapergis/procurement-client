import { defineStore } from 'pinia';
import type { User } from 'firebase/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
  },
});
