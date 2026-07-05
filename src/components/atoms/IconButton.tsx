import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';

interface IconButtonProps {
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  active?: boolean;
  bordered?: boolean;
  accessibilityLabel: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Square, tappable icon. Used for the bell and the list/grid view toggle. */
export const IconButton = ({
  icon,
  onPress,
  active = false,
  bordered = false,
  accessibilityLabel,
  children,
  style,
  testID,
}: IconButtonProps) => (
  <Pressable
    testID={testID}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    accessibilityState={{ selected: active }}
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      bordered ? styles.bordered : null,
      active ? styles.active : null,
      pressed ? styles.pressed : null,
      style,
    ]}
  >
    <Feather
      name={icon}
      size={20}
      color={active ? colors.primary : colors.body}
    />
    {children}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  active: { backgroundColor: colors.surface },
  pressed: { opacity: 0.7 },
});
