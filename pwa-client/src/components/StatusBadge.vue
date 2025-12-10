<template>
  <span :class="badgeClasses">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Status = 'pending' | 'processing' | 'uploaded' | 'failed' | 'paid' | 'unpaid' | 'partially_paid';

const props = defineProps<{ status: Status }>();

const labelMap: Record<Status, string> = {
  pending: 'Σε αναμονή',
  processing: 'Σε επεξεργασία',
  uploaded: 'Μεταφορτώθηκε',
  failed: 'Αποτυχία Μεταφόρτωσης',
  paid: 'Εξωφλημένο',
  unpaid: 'Μη εξωφλημένο',
  partially_paid: 'Μερικώς εξωφλημένο',
};

const colors: Record<Status, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-sky-100 text-sky-700',
  uploaded: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-rose-100 text-rose-700',
  paid: 'bg-emerald-100 text-emerald-700',
  unpaid: 'bg-rose-100 text-rose-700',
  partially_paid: 'bg-amber-100 text-amber-700',
};

const badgeClasses = computed(
  () => `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colors[props.status]}`
);

const label = computed(() => labelMap[props.status]);
</script>
