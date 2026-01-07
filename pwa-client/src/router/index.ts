import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import LoginPage from '@/pages/LoginPage.vue';
import UploadPage from '@/pages/UploadPage.vue';
import SuppliersPage from '@/pages/SuppliersPage.vue';
import SupplierInvoicesPage from '@/pages/SupplierInvoicesPage.vue';
import OverviewPage from '@/pages/OverviewPage.vue';
import InvoicesPage from '@/pages/InvoicesPage.vue';
import NotificationsPage from '@/pages/NotificationsPage.vue';
import IncomePage from '@/pages/IncomePage.vue';
import ExpensesPage from '@/pages/ExpensesPage.vue';
import FinancialOverviewPage from '@/pages/FinancialOverviewPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: OverviewPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/upload', name: 'upload', component: UploadPage },
  { path: '/invoices', name: 'invoices', component: InvoicesPage },
  { path: '/suppliers', name: 'suppliers', component: SuppliersPage },
  { path: '/suppliers/:supplierId/invoices', name: 'supplier-invoices', component: SupplierInvoicesPage },
  { path: '/notifications', name: 'notifications', component: NotificationsPage },
  { path: '/income', name: 'income', component: IncomePage },
  { path: '/expenses', name: 'expenses', component: ExpensesPage },
  { path: '/financial-overview', name: 'financial-overview', component: FinancialOverviewPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
