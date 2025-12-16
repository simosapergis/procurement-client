<template>
  <section class="w-full">
    <header class="mb-6">
      <h2 class="text-2xl font-semibold text-slate-900">Προμηθευτές</h2>
      <p class="mt-1 text-sm text-slate-500">Επιλέξτε προμηθευτή για να δείτε τα τιμολόγιά του</p>
    </header>

    <Loader v-if="loading" label="Φόρτωση προμηθευτών..." />
    <p v-else-if="error" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
      {{ error }}
    </p>
    <div v-else class="grid gap-4 md:grid-cols-2">
      <button
        v-for="supplier in suppliers"
        :key="supplier.id"
        type="button"
        class="text-left transition hover:-translate-y-0.5"
        @click="selectSupplier(supplier.id)"
      >
        <SupplierCard :supplier="supplier" />
      </button>
    </div>
    <p v-if="!loading && suppliers.length === 0" class="mt-4 text-sm text-slate-500">
      Δεν βρέθηκαν προμηθευτές.
    </p>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Loader from '@/components/Loader.vue';
import SupplierCard from '@/components/SupplierCard.vue';
import { useSuppliers } from '@/composables/useSuppliers';

const router = useRouter();
const { suppliers, loading, error, hydrate } = useSuppliers();

onMounted(async () => {
  await hydrate();
});

const selectSupplier = (supplierId: string) => {
  router.push({ name: 'supplier-invoices', params: { supplierId } });
};
</script>
