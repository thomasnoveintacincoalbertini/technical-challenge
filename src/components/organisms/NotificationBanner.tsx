import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../theme';
import { DocumentNotification } from '../../types/document';
import { AppText } from '../atoms/AppText';

interface NotificationBannerProps {
  notification: DocumentNotification | null;
  onPress: () => void;
}

const VISIBLE_MS = 4000;

/**
 * Transient in-app banner that surfaces the latest real-time notification and
 * auto-dismisses. Tapping it opens the notifications panel.
 */
export const NotificationBanner = ({
  notification,
  onPress,
}: NotificationBannerProps) => {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const [current, setCurrent] = useState<DocumentNotification | null>(null);

  useEffect(() => {
    if (!notification) return;
    setCurrent(notification);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setCurrent(null));
    }, VISIBLE_MS);

    return () => clearTimeout(timer);
    // Re-run for every new notification (identity changes on each event).
  }, [notification, opacity]);

  if (!current) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.wrapper, { top: insets.top + spacing.sm, opacity }]}
    >
      <Pressable style={styles.banner} onPress={onPress} accessibilityRole="button">
        <Feather name="file-plus" size={18} color={colors.onPrimary} />
        <AppText variant="body" color={colors.onPrimary} numberOfLines={2} style={styles.text}>
          {current.userName} created “{current.documentTitle}”
        </AppText>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.heading,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    shadowColor: '#0B1220',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  text: { flex: 1 },
});
