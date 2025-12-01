export const formatDateTime = (value?: string | Date) => {
  if (!value) return 'Unknown';
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};
