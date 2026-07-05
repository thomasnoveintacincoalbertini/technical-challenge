import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { IconButton } from '../atoms/IconButton';

export type ViewMode = 'list' | 'grid';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

/** Segmented list/grid switch shown top-right of the toolbar. */
export const ViewToggle = ({ mode, onChange }: ViewToggleProps) => (
  <View style={styles.container}>
    <IconButton
      icon="list"
      accessibilityLabel="List view"
      active={mode === 'list'}
      onPress={() => onChange('list')}
      testID="view-toggle-list"
    />
    <IconButton
      icon="grid"
      accessibilityLabel="Grid view"
      active={mode === 'grid'}
      onPress={() => onChange('grid')}
      testID="view-toggle-grid"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xs,
    gap: spacing.xs,
    backgroundColor: colors.background,
  },
});
