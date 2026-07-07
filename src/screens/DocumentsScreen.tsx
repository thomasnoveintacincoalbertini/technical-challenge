import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';
import { useDocuments } from '../hooks/useDocuments';
import { useNotifications } from '../hooks/useNotifications';
import { sortDocuments, SortKey } from '../utils/sortDocuments';
import { ViewMode } from '../components/molecules/ViewToggle';
import { Button } from '../components/atoms/Button';
import { DocumentsHeader } from '../components/organisms/DocumentsHeader';
import { Toolbar } from '../components/organisms/Toolbar';
import { DocumentFeed } from '../components/organisms/DocumentFeed';
import { AddDocumentSheet } from '../components/organisms/AddDocumentSheet';
import { NotificationsSheet } from '../components/organisms/NotificationsSheet';
import { NotificationBanner } from '../components/organisms/NotificationBanner';

/**
 * Top-level screen. Wires the documents and notifications hooks to the UI and
 * owns view-level state (sort key, list/grid mode, sheet visibility). All data
 * concerns live in the hooks, keeping this component purely about composition.
 */
export const DocumentsScreen = () => {
  const insets = useSafeAreaInsets();
  const { documents, loading, refreshing, error, refresh, addDocument } =
    useDocuments();
  const { notifications, unreadCount, latest, markAllRead } = useNotifications();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortKey, setSortKey] = useState<SortKey>('recent');
  const [addOpen, setAddOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const sortedDocuments = useMemo(
    () => sortDocuments(documents, sortKey),
    [documents, sortKey],
  );

  const openNotifications = () => {
    markAllRead();
    setNotificationsOpen(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header shares the white status-bar area; the feed below is grey. */}
      <DocumentsHeader
        unreadCount={unreadCount}
        onBellPress={openNotifications}
      />
      <View style={styles.body}>
        <Toolbar
          sortKey={sortKey}
          onSortChange={setSortKey}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <DocumentFeed
          documents={sortedDocuments}
          mode={viewMode}
          loading={loading}
          refreshing={refreshing}
          error={error}
          onRefresh={refresh}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          label="Add document"
          icon="plus"
          onPress={() => setAddOpen(true)}
          testID="add-document"
        />
      </View>

      <AddDocumentSheet
        visible={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={async (input) => {
          await addDocument(input);
        }}
      />
      <NotificationsSheet
        visible={notificationsOpen}
        notifications={notifications}
        onClose={() => setNotificationsOpen(false)}
      />
      <NotificationBanner notification={latest} onPress={openNotifications} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  body: { flex: 1, backgroundColor: colors.background },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
