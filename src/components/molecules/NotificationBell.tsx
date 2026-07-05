import { View, StyleSheet } from 'react-native';
import { Badge } from '../atoms/Badge';
import { IconButton } from '../atoms/IconButton';

interface NotificationBellProps {
  count: number;
  onPress: () => void;
}

/** Bell icon with an unread badge (top-right of the header). */
export const NotificationBell = ({ count, onPress }: NotificationBellProps) => (
  <View style={styles.wrapper}>
    <IconButton
      icon="bell"
      bordered
      accessibilityLabel={`Notifications, ${count} unread`}
      onPress={onPress}
      testID="notification-bell"
    />
    <Badge count={count} testID="notification-badge" />
  </View>
);

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
});
