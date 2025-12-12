import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import UploadPage from '@/pages/UploadPage.vue';
import InvoiceDetailsPage from '@/pages/InvoiceDetailsPage.vue';
import SuppliersPage from '@/pages/SuppliersPage.vue';
import OverviewPage from '@/pages/OverviewPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/upload', name: 'upload', component: UploadPage },
  { path: '/invoices/:id', name: 'invoice-details', component: InvoiceDetailsPage, props: true },
  { path: '/suppliers', name: 'suppliers', component: SuppliersPage },
  { path: '/overview', name: 'overview', component: OverviewPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
