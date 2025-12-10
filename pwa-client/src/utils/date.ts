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
