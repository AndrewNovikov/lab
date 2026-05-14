import type { ReportInstance, ReportStatus } from './types';

export function submitReport(
  id: number,
  onStatusChange: (id: number, status: ReportStatus) => void
): ReportInstance {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const created_date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const delay = 3000 + Math.random() * 3000;
  setTimeout(() => {
    const status: ReportStatus = Math.random() < 0.8 ? 'Completed' : 'Failed';
    onStatusChange(id, status);
  }, delay);

  return { id, created_date, status: 'Running' };
}
