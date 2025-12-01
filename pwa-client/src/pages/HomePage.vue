<template>
  <section class="grid w-full gap-10 lg:grid-cols-2">
    <div class="space-y-6">
      <p class="text-sm font-semibold uppercase tracking-tight text-primary-600">Procurement PWA</p>
      <h1 class="text-4xl font-bold leading-tight text-slate-900">Capture, validate, and send invoices in seconds.</h1>
      <p class="text-lg text-slate-600">
        Upload crisp invoice photos, run automatic quality checks, and deliver them securely to your procurement
        backend using signed URLs.
      </p>
      <div class="flex gap-4">
        <RouterLink to="/upload" class="rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white shadow-md hover:bg-primary-700">Start Upload</RouterLink>
        <RouterLink to="/invoices" class="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-white">View Invoices</RouterLink>
      </div>
    </div>
    <div class="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 shadow-inner">
      <ul class="space-y-4 text-sm text-slate-600">
        <li>- Capture via mobile camera with offline support.</li>
        <li>- Automated quality assurance pipeline.</li>
        <li>- Uploads routed through secure signed URLs.</li>
        <li>- Firebase Auth + Firestore ready integration.</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
