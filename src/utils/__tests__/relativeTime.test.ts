import { formatRelativeTime } from '../relativeTime';

describe('formatRelativeTime', () => {
  const now = new Date('2020-08-12T12:00:00.000Z');

  it('formats seconds', () => {
    const date = new Date(now.getTime() - 30 * 1000);
    expect(formatRelativeTime(date, now)).toBe('30 seconds ago');
  });

  it('rolls up to minutes', () => {
    const date = new Date(now.getTime() - 130 * 1000);
    expect(formatRelativeTime(date, now)).toBe('2 minutes ago');
  });

  it('formats a day in the past', () => {
    const date = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date, now)).toBe('1 day ago');
  });

  it('formats a future date', () => {
    const date = new Date(now.getTime() + 5 * 60 * 1000);
    expect(formatRelativeTime(date, now)).toBe('in 5 minutes');
  });

  it('returns empty string for an invalid date', () => {
    expect(formatRelativeTime('not-a-date', now)).toBe('');
  });
});
