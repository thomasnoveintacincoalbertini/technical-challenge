import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { SortKey, SORT_OPTIONS } from '../../utils/sortDocuments';
import { AppText } from '../atoms/AppText';

interface SortControlProps {
  value: SortKey;
  onChange: (key: SortKey) => void;
}

/** "Sort by" control: a pill that opens a menu of sort options. */
export const SortControl = ({ value, onChange }: SortControlProps) => {
  const [open, setOpen] = useState(false);

  const select = (key: SortKey) => {
    onChange(key);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sort documents"
        onPress={() => setOpen(true)}
        style={({ pressed }) => [styles.pill, pressed ? styles.pressed : null]}
      >
        <Feather name="chevrons-down" size={16} color={colors.heading} />
        <AppText variant="sectionLabel">Sort by</AppText>
        <View style={styles.divider} />
        <Feather name="chevron-down" size={18} color={colors.heading} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option.key}
                onPress={() => select(option.key)}
                style={({ pressed }) => [
                  styles.item,
                  pressed ? styles.itemPressed : null,
                ]}
              >
                <AppText
                  variant="body"
                  color={option.key === value ? colors.primary : colors.body}
                >
                  {option.label}
                </AppText>
                {option.key === value ? (
                  <Feather name="check" size={18} color={colors.primary} />
                ) : null}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  pressed: { opacity: 0.7 },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.xs,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  itemPressed: { backgroundColor: colors.background },
});
