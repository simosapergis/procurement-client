# AGENTS.md — Procurement Client

## Project Overview

A **procurement and invoicing automation PWA** for Greek small and medium businesses.
Users scan/upload invoices, manage suppliers, track income/expenses, and generate financial reports.

- **Framework**: Vue 3.4 + TypeScript 5.6 (Composition API with `<script setup lang="ts">` exclusively)
- **Styling**: Tailwind CSS 3.4 (utility classes only, no component library)
- **State Management**: Pinia 2.1
- **Routing**: Vue Router 4.3 (lazy-loaded routes)
- **Backend**: Firebase 11 (Auth, Firestore, Storage, Cloud Messaging)
- **Cloud Functions**: europe-west6 region, called via REST with Firebase Auth ID tokens
- **PWA**: vite-plugin-pwa with Workbox (auto-update, offline support)
- **Build**: Vite 5
- **Testing**: Vitest (configured, no test files yet)
- **Hosting**: Firebase Hosting
- **Locale**: Greek UI (`el-GR`), currency formatting with `Intl.NumberFormat('el-GR')`

## Architecture

```
pwa-client/
├── src/
│   ├── main.ts                    # App entry: Pinia, Router, mount, SW registration
│   ├── App.vue                    # Root layout: header, nav, sidebar, toasts
│   ├── pages/                     # Route-level page components (*Page.vue)
│   ├── components/                # Reusable UI components (PascalCase.vue)
│   ├── composables/               # Composition API hooks (use*.ts)
│   ├── store/                     # Pinia stores (*Store.ts)
│   ├── services/
│   │   ├── firebase.ts            # Firebase app initialization
│   │   ├── notifications.ts       # Pub/sub toast notification bus
│   │   └── api/                   # REST API service modules (one per endpoint group)
│   ├── modules/
│   │   ├── invoices/              # Invoice domain types and helpers
│   │   └── suppliers/             # Supplier domain types
│   ├── utils/                     # Pure utility functions (date, image, file, uuid)
│   └── assets/styles/             # Global CSS (Tailwind base)
├── public/                        # Static assets, PWA manifest, Firebase messaging SW
├── index.html                     # HTML entry point
├── vite.config.ts                 # Vite + VitePWA configuration
├── tailwind.config.cjs            # Tailwind theme (custom primary palette)
├── firebase.json                  # Firebase Hosting config
└── .firebaserc                    # Firebase project alias
```

## Key Conventions

### File Naming
- Pages: `*Page.vue` (e.g., `OverviewPage.vue`, `InvoicesPage.vue`)
- Components: `PascalCase.vue` (e.g., `InvoicePreviewCard.vue`, `StatusBadge.vue`)
- Composables: `use*.ts` (e.g., `useAuth.ts`, `useFirestore.ts`)
- Stores: `*Store.ts` (e.g., `invoiceStore.ts`, `userStore.ts`)
- API services: descriptive camelCase (e.g., `updatePaymentStatus.ts`, `financialApi.ts`)

### Vue Components
- Always use `<script setup lang="ts">` — no Options API
- Props via `defineProps<{...}>()`
- Emits via `defineEmits<{...}>()`
- Template first, then script, then scoped styles

### API Calls
- All API calls go through `src/services/api/apiClient.ts` (shared auth + fetch wrapper)
- Firebase Auth ID token is attached as `Authorization: Bearer <token>`
- Base URL and endpoint paths are configured via `VITE_*` env vars
- Error messages are in Greek

### Firestore Structure
- `invoices` — top-level invoice collection
- `suppliers` — top-level supplier collection
- `suppliers/{supplierId}/invoices` — per-supplier invoice sub-collection
- `metadata_invoices` — invoice processing metadata (used for notifications)
- Cross-supplier queries use `collectionGroup('invoices')`

### Styling
- Tailwind utility classes only; no inline styles
- Custom primary color palette (indigo-based) defined in `tailwind.config.cjs`
- Rounded corners: `rounded-xl` for small elements, `rounded-2xl`/`rounded-3xl` for cards
- Shadows: `shadow-sm` for subtle, `shadow-lg` for prominent elements
- Responsive: mobile-first, `sm:` and `lg:` breakpoints

## Environment Variables

All variables are prefixed with `VITE_` and accessed via `import.meta.env`.

### Firebase Config
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_FIREBASE_BUCKET_FOLDER` — upload folder in Cloud Storage (default: `uploads`)

### App Config
- `VITE_INVOICE_EXPIRY_DAYS` — days until invoice expiry warning (default: `30`)

### API Endpoints
- `VITE_BASE_URL` — Cloud Functions base URL (e.g., `https://europe-west6-<project>.cloudfunctions.net`)
- `VITE_SIGNED_UPLOAD_URL_PATH`
- `VITE_SIGNED_DOWNLOAD_URL_PATH`
- `VITE_UPDATE_INVOICE_FIELDS_PATH`
- `VITE_UPDATE_PAYMENT_STATUS_PATH`
- `VITE_UPDATE_SUPPLIER_FIELDS_PATH`
- `VITE_ADD_FINANCIAL_ENTRY_PATH`
- `VITE_DELETE_FINANCIAL_ENTRY_PATH`
- `VITE_GET_FINANCIAL_REPORT_PATH`
- `VITE_ADD_RECURRING_EXPENSE_PATH`
- `VITE_UPDATE_RECURRING_EXPENSE_PATH`
- `VITE_GET_RECURRING_EXPENSES_PATH`
- `VITE_EXPORT_INVOICES_PATH`

## Deployment

### Production
```bash
cd pwa-client
./deploy.sh production
```

### Staging (7-day preview channel)
```bash
cd pwa-client
./deploy.sh staging
```

### Manual
```bash
cd pwa-client
npm run build
firebase deploy --only hosting
```

### Staging Preview Channel
```bash
firebase hosting:channel:deploy staging --expires 7d
```

### Switch Firebase Project
```bash
firebase use <project-id>
```

## Common Gotchas

- The app UI is entirely in Greek. All user-facing strings should be in Greek.
- `formatCurrency` lives in `utils/date.ts` (historical; may move to `utils/format.ts` later).
- The `Invoice` interface is defined in `modules/invoices/InvoiceMapper.ts` and is the canonical type used everywhere.
- `Supplier` types (including `SupplierDelivery`) are defined in `modules/suppliers/Supplier.ts`.
- API services use `import.meta.env.VITE_BASE_URL` for the Cloud Functions base — ensure `.env.local` is set up from `.env.example`.
- The PWA manifest in `vite.config.ts` overrides `public/manifest.webmanifest` at build time.
