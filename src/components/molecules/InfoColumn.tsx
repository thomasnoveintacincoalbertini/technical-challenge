import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';
import { AppText } from '../atoms/AppText';

interface InfoColumnProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  items: string[];
}

/** A titled, icon-led list of values — the Contributors / Attachments columns. */
export const InfoColumn = ({ icon, title, items }: InfoColumnProps) => (
  <View style={styles.column}>
    <View style={styles.header}>
      <Feather name={icon} size={16} color={colors.heading} />
      <AppText variant="columnHeader">{title}</AppText>
    </View>
    {items.length === 0 ? (
      <AppText variant="bodyMuted">—</AppText>
    ) : (
      items.map((item, index) => (
        <AppText key={`${item}-${index}`} variant="bodyMuted" numberOfLines={1}>
          {item}
        </AppText>
      ))
    )}
  </View>
);

const styles = StyleSheet.create({
  column: { flex: 1, gap: spacing.xs },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});
