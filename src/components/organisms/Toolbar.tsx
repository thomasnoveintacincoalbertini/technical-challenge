import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { SortKey } from '../../utils/sortDocuments';
import { SortControl } from '../molecules/SortControl';
import { ViewMode, ViewToggle } from '../molecules/ViewToggle';

interface ToolbarProps {
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

/** Row above the feed: sort control on the left, view toggle on the right. */
export const Toolbar = ({
  sortKey,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ToolbarProps) => (
  <View style={styles.toolbar}>
    <SortControl value={sortKey} onChange={onSortChange} />
    <ViewToggle mode={viewMode} onChange={onViewModeChange} />
  </View>
);

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
});
