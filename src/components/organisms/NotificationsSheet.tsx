import { FlatList, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { DocumentNotification } from '../../types/document';
import { formatRelativeTime } from '../../utils/relativeTime';
import { AppText } from '../atoms/AppText';
import { BottomSheet } from './BottomSheet';

interface NotificationsSheetProps {
  visible: boolean;
  notifications: DocumentNotification[];
  onClose: () => void;
}

/** Bottom sheet listing the real-time notifications received so far. */
export const NotificationsSheet = ({
  visible,
  notifications,
  onClose,
}: NotificationsSheetProps) => (
  <BottomSheet visible={visible} title="Notifications" onClose={onClose}>
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => `${item.documentId}-${item.timestamp}-${index}`}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <AppText variant="bodyMuted" style={styles.empty}>
          No notifications yet.
        </AppText>
      }
      renderItem={({ item }) => (
        <View style={styles.row}>
          <View style={styles.icon}>
            <Feather name="file-plus" size={18} color={colors.primary} />
          </View>
          <View style={styles.text}>
            <AppText variant="body">
              <AppText variant="body" color={colors.heading} style={styles.bold}>
                {item.userName}
              </AppText>{' '}
              created “{item.documentTitle}”
            </AppText>
            <AppText variant="bodyMuted">
              {formatRelativeTime(item.timestamp)}
            </AppText>
          </View>
        </View>
      )}
    />
  </BottomSheet>
);

const styles = StyleSheet.create({
  list: { maxHeight: 380 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 2 },
  bold: { fontWeight: '700' },
  separator: { height: 1, backgroundColor: colors.border },
  empty: { paddingVertical: spacing.xxl, textAlign: 'center' },
});
