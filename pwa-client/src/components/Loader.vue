<template>
  <div class="flex items-center gap-3 py-6">
    <span class="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-primary-500"></span>
    <p class="text-sm font-medium text-slate-500">{{ props.label }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ label?: string }>(),
  {
    label: 'Processing...'
  }
);
</script>
