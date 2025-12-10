<template>
  <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <header class="flex items-center justify-between">
      <h3 class="text-base font-semibold text-slate-900">{{ supplier.name }}</h3>
      <span :class="badgeClass">{{ supplier.status ?? 'unknown' }}</span>
    </header>
    <p v-if="supplier.contactEmail" class="mt-2 text-sm text-slate-500">
      {{ supplier.contactEmail }}
    </p>
    <p v-if="supplier.contactPhone" class="text-sm text-slate-500">
      {{ supplier.contactPhone }}
    </p>
    <p v-if="supplier.city || supplier.country" class="mt-2 text-xs text-slate-400">
      {{ [supplier.city, supplier.country].filter(Boolean).join(', ') }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Supplier } from '@/modules/suppliers/Supplier';

const props = defineProps<{ supplier: Supplier }>();

const badgeClass = computed(() => {
  const base = 'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold';
  switch (props.supplier.status) {
    case 'active':
      return `${base} text-emerald-700`;
    case 'prospect':
      return `${base} text-amber-700`;
    case 'inactive':
      return `${base} text-slate-500`;
    default:
      return base;
  }
});
</script>




