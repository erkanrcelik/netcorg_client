export const epochToDate = (epoch: number): string => {
  const date = new Date(epoch * 1000);
  const formattedDate = date.toISOString().split('T')[0]; // Tarih kısmı
  const formattedTime = date.toTimeString().split(' ')[0]; // Saat kısmı
  return `${formattedDate} - ${formattedTime}`;
};

export const dateToEpoch = (date: Date): number => {
  return Math.floor(date.getTime() / 1000); // Tarihi epoch zamanına çevir ve saniye cinsinden döndür
};

export const formatDuration = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= (24 * 60 * 60);

  const hours = Math.floor(seconds / (60 * 60));
  seconds %= (60 * 60);

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts = [];

  if (days > 0) parts.push(`${days} Gün`);
  if (hours > 0) parts.push(`${hours} Saat`);
  if (minutes > 0) parts.push(`${minutes} Dakika`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} Saniye`);

  return parts.join(' ');
}