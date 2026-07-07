import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import { colors, spacing } from '../../theme';
import { Document } from '../../types/document';
import { AppText } from '../atoms/AppText';
import { DocumentCard } from '../molecules/DocumentCard';
import { ViewMode } from '../molecules/ViewToggle';

interface DocumentFeedProps {
  documents: Document[];
  mode: ViewMode;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  onRefresh: () => void;
}

const shareDocument = (document: Document) =>
  Share.share({
    title: document.title,
    message: `${document.title} — Version ${document.version}`,
  }).catch(() => undefined);

/**
 * The scrollable document collection. Owns presentation states (loading, error,
 * empty), the list/grid layout switch and pull-to-refresh. Long-pressing a card
 * opens the native share sheet.
 */
export const DocumentFeed = ({
  documents,
  mode,
  loading,
  refreshing,
  error,
  onRefresh,
}: DocumentFeedProps) => {
  const isGrid = mode === 'grid';

  const renderItem = useCallback(
    ({ item }: { item: Document }) => (
      <View style={isGrid ? styles.gridItem : styles.listItem}>
        <DocumentCard
          document={item}
          mode={mode}
          onLongPress={() => shareDocument(item)}
        />
      </View>
    ),
    [isGrid, mode],
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <FlatList
      // Remount when the column count changes; FlatList can't animate numColumns.
      key={mode}
      data={documents}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={isGrid ? 2 : 1}
      columnWrapperStyle={isGrid ? styles.gridRow : undefined}
      style={styles.list}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
      ListEmptyComponent={
        <View style={styles.centered}>
          <AppText variant="bodyMuted">
            {error ?? 'No documents yet. Add your first one below.'}
          </AppText>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: { flex: 1 },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
    flexGrow: 1,
  },
  gridRow: { gap: spacing.lg },
  gridItem: { flex: 1 },
  listItem: { width: '100%' },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
});
