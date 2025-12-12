export const formatDateTime = (value?: string | Date) => {
  if (!value) return 'Unknown';

  if (value.seconds) {
    return new Date(value.seconds * 1000).toLocaleString("el-GR", {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

/** Number of days until an invoice is considered expired/due for payment */
export const INVOICE_EXPIRY_DAYS = parseInt(import.meta.env.VITE_INVOICE_EXPIRY_DAYS, 10) || 30;

/**
 * Checks if an invoice is expired based on the given date
 * @param invoiceDate - The date of the invoice (string, Date, or Firestore timestamp)
 * @returns true if the invoice has exceeded the expiry threshold
 */
export const isInvoiceExpired = (invoiceDate?: string | Date | { seconds: number }): boolean => {
  if (!invoiceDate) return false;

  let date: Date;
  if (typeof invoiceDate === 'object' && 'seconds' in invoiceDate) {
    date = new Date(invoiceDate.seconds * 1000);
  } else {
    date = typeof invoiceDate === 'string' ? new Date(invoiceDate) : invoiceDate;
  }

  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays > INVOICE_EXPIRY_DAYS;
};

/**
 * Gets the number of days remaining until an invoice expires
 * @param invoiceDate - The date of the invoice (string, Date, or Firestore timestamp)
 * @returns Number of days remaining (negative if expired)
 */
export const getDaysUntilExpiry = (invoiceDate?: string | Date | { seconds: number }): number | null => {
  if (!invoiceDate) return null;

  let date: Date;
  if (typeof invoiceDate === 'object' && 'seconds' in invoiceDate) {
    date = new Date(invoiceDate.seconds * 1000);
  } else {
    date = typeof invoiceDate === 'string' ? new Date(invoiceDate) : invoiceDate;
  }

  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return Math.ceil(INVOICE_EXPIRY_DAYS - diffDays);
};
