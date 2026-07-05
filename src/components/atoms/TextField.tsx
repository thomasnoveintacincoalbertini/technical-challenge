import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { colors, radius, spacing } from '../../theme';

/** Bordered single-line input matching the mockup form fields. */
export const TextField = (props: TextInputProps) => (
  <TextInput
    placeholderTextColor={colors.muted}
    style={styles.input}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.heading,
    backgroundColor: colors.surface,
  },
});
