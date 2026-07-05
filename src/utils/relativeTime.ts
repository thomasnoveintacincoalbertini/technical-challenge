/**
 * Formats a date as a human-friendly relative string, e.g. "1 day ago".
 * Uses the platform Intl API (available in Hermes) so we ship no date library.
 */
const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: 'seconds' },
  { amount: 60, unit: 'minutes' },
  { amount: 24, unit: 'hours' },
  { amount: 7, unit: 'days' },
  { amount: 4.34524, unit: 'weeks' },
  { amount: 12, unit: 'months' },
  { amount: Number.POSITIVE_INFINITY, unit: 'years' },
];

export const formatRelativeTime = (
  date: string | number | Date,
  now: Date = new Date(),
): string => {
  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return '';

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'always' });
  let duration = (target.getTime() - now.getTime()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return '';
};
