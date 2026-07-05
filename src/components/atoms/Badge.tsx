import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../theme';
import { AppText } from './AppText';

interface BadgeProps {
  count: number;
  testID?: string;
}

/** Small blue counter shown over the notification bell. Hidden when zero. */
export const Badge = ({ count, testID }: BadgeProps) => {
  if (count <= 0) return null;
  return (
    <View style={styles.badge} testID={testID}>
      <AppText style={styles.text} color={colors.onPrimary}>
        {count > 99 ? '99+' : count}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.badge,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  text: { fontSize: 11, fontWeight: '700', lineHeight: 14 },
});
