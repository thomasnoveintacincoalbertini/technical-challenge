/**
 * Design tokens derived from the provided mockups. Components read from these
 * tokens only — no raw colors or magic numbers live in the UI layer, so
 * restyling the whole app is a single-file change.
 */
export const colors = {
  primary: '#2F6BF6',
  onPrimary: '#FFFFFF',
  heading: '#16202C',
  body: '#374151',
  muted: '#7B8794',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  border: '#E4E7EB',
  badge: '#2F6BF6',
  overlay: 'rgba(17, 24, 39, 0.45)',
  danger: '#DC2626',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  screenTitle: { fontSize: 28, fontWeight: '800', color: colors.heading },
  cardTitle: { fontSize: 18, fontWeight: '700', color: colors.heading },
  version: { fontSize: 14, fontWeight: '400', color: colors.muted },
  sectionLabel: { fontSize: 15, fontWeight: '700', color: colors.heading },
  columnHeader: { fontSize: 15, fontWeight: '700', color: colors.heading },
  body: { fontSize: 15, fontWeight: '400', color: colors.body },
  bodyMuted: { fontSize: 15, fontWeight: '400', color: colors.muted },
  button: { fontSize: 16, fontWeight: '700', color: colors.onPrimary },
} as const;

export type TypographyVariant = keyof typeof typography;
