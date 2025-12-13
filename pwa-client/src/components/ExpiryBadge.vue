<template>
  <span v-if="expiryInfo" :class="badgeClasses">{{ expiryInfo.label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getDaysUntilExpiry, INVOICE_EXPIRY_DAYS } from '@/utils/date';

type DateInput = string | Date | { seconds: number };

const props = defineProps<{ invoiceDate?: DateInput }>();

interface ExpiryInfo {
  label: string;
  colorClass: string;
}

const expiryInfo = computed<ExpiryInfo | null>(() => {
  const daysRemaining = getDaysUntilExpiry(props.invoiceDate);
  
  if (daysRemaining === null) return null;

  if (daysRemaining < 0) {
    // Invoice has expired
    return {
      label: 'Έληξε',
      colorClass: 'bg-rose-100 text-rose-700',
    };
  }

  if (daysRemaining === 0) {
    // Expires today
    return {
      label: 'Λήγει σήμερα',
      colorClass: 'bg-orange-100 text-orange-700',
    };
  }

  if (daysRemaining <= 7) {
    // Expires within a week - urgent warning
    return {
      label: `Λήγει σε ${daysRemaining} ${daysRemaining === 1 ? 'μέρα' : 'μέρες'}`,
      colorClass: 'bg-amber-100 text-amber-700',
    };
  }

  if (daysRemaining === INVOICE_EXPIRY_DAYS) {
    // Just created / full time remaining
    return {
      label: `Λήγει σε ${INVOICE_EXPIRY_DAYS} μέρες`,
      colorClass: 'bg-sky-100 text-sky-700',
    };
  }

  // More than a week remaining
  return {
    label: `Λήγει σε ${daysRemaining} μέρες`,
    colorClass: 'bg-slate-100 text-slate-600',
  };
});

const badgeClasses = computed(() =>
  `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${expiryInfo.value?.colorClass ?? ''}`
);
</script>





