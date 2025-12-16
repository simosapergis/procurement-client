<template>
  <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
    <header class="flex items-center justify-between gap-3">
      <div class="min-w-0 flex-1">
        <h3 class="text-base font-semibold text-slate-900">{{ supplier.name }}</h3>
        <p v-if="supplier.taxId || supplier.id" class="mt-0.5 text-xs text-slate-400">
          ΑΦΜ: {{ supplier.taxId ?? supplier.id }}
        </p>
      </div>
      <span v-if="supplier.status" :class="badgeClass">{{ statusLabel }}</span>
    </header>
    <div v-if="supplier.contactEmail || supplier.contactPhone" class="mt-3 space-y-1">
      <p v-if="supplier.contactEmail" class="flex items-center gap-2 text-sm text-slate-500">
        <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {{ supplier.contactEmail }}
      </p>
      <p v-if="supplier.contactPhone" class="flex items-center gap-2 text-sm text-slate-500">
        <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {{ supplier.contactPhone }}
      </p>
    </div>
    <p v-if="supplier.city || supplier.country" class="mt-3 text-xs text-slate-400">
      {{ [supplier.city, supplier.country].filter(Boolean).join(', ') }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Supplier } from '@/modules/suppliers/Supplier';

const props = defineProps<{ supplier: Supplier }>();

const badgeClass = computed(() => {
  const base = 'shrink-0 rounded-full px-3 py-1 text-xs font-semibold';
  switch (props.supplier.status) {
    case 'active':
      return `${base} bg-emerald-50 text-emerald-700`;
    case 'prospect':
      return `${base} bg-amber-50 text-amber-700`;
    case 'inactive':
      return `${base} bg-slate-100 text-slate-500`;
    default:
      return `${base} bg-slate-100 text-slate-600`;
  }
});

const statusLabel = computed(() => {
  switch (props.supplier.status) {
    case 'active':
      return 'Ενεργός';
    case 'prospect':
      return 'Υποψήφιος';
    case 'inactive':
      return 'Ανενεργός';
    default:
      return props.supplier.status ?? '';
  }
});
</script>




