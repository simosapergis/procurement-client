# Procurement Client

A smart procurement & invoicing automation platform for small and medium businesses.

## Getting Started

```bash
cd pwa-client
npm install
npm run dev
```

## Deployment

### Staging (default — 7-day preview channel)
```bash
cd pwa-client
npm run deploy:staging
```

### Production
```bash
cd pwa-client
npm run deploy:prod
```

Both scripts run TypeScript type checking and a production build before deploying.
The production deploy requires explicit confirmation.

### Manual Deploy
```bash
cd pwa-client
npm run build
firebase deploy --only hosting
```

### Staging Preview Channel (manual)
```bash
firebase hosting:channel:deploy staging --expires 7d
```

### Switch Firebase Project
```bash
firebase use <project-id>
```

## CORS Configuration

If CORS is not set for the storage bucket:
```bash
gsutil cors set cors.json gs://forbidden-fruit-invoices.firebasestorage.app
gsutil cors get gs://forbidden-fruit-invoices.firebasestorage.app
```

Edit `cors.json` to add IP or hostname for CORS.
