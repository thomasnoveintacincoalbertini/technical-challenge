/**
 * Formats a date as a human-friendly relative string, e.g. "1 day ago".
 * Implemented by hand rather than via `Intl.RelativeTimeFormat`, which is not
 * guaranteed to be present in every Hermes build — so we ship no date library
 * and depend on no optional runtime API.
 */
const DIVISIONS: { amount: number; unit: string }[] = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

const phrase = (value: number, unit: string): string => {
  if (value === 0) return 'just now';
  const abs = Math.abs(value);
  const label = `${abs} ${unit}${abs === 1 ? '' : 's'}`;
  return value < 0 ? `${label} ago` : `in ${label}`;
};

export const formatRelativeTime = (
  date: string | number | Date,
  now: Date = new Date(),
): string => {
  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return '';

  let duration = (target.getTime() - now.getTime()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return phrase(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return '';
};
