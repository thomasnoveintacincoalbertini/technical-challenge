import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { AppText } from '../atoms/AppText';
import { NotificationBell } from '../molecules/NotificationBell';

interface DocumentsHeaderProps {
  unreadCount: number;
  onBellPress: () => void;
}

/** Screen header: title on the left, notification bell on the right. */
export const DocumentsHeader = ({
  unreadCount,
  onBellPress,
}: DocumentsHeaderProps) => (
  <View style={styles.header}>
    <AppText variant="screenTitle">Documents</AppText>
    <NotificationBell count={unreadCount} onPress={onBellPress} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
});
