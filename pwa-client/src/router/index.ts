import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/OverviewPage.vue') },
  { path: '/login', name: 'login', component: () => import('@/pages/LoginPage.vue') },
  { path: '/upload', name: 'upload', component: () => import('@/pages/UploadPage.vue') },
  { path: '/invoices', name: 'invoices', component: () => import('@/pages/InvoicesPage.vue') },
  { path: '/suppliers', name: 'suppliers', component: () => import('@/pages/SuppliersPage.vue') },
  { path: '/suppliers/:supplierId/invoices', name: 'supplier-invoices', component: () => import('@/pages/SupplierInvoicesPage.vue') },
  { path: '/notifications', name: 'notifications', component: () => import('@/pages/NotificationsPage.vue') },
  { path: '/income', name: 'income', component: () => import('@/pages/IncomePage.vue') },
  { path: '/expenses', name: 'expenses', component: () => import('@/pages/ExpensesPage.vue') },
  { path: '/financial-overview', name: 'financial-overview', component: () => import('@/pages/FinancialOverviewPage.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
