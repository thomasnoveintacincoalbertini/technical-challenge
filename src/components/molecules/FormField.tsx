import { StyleSheet, TextInputProps, View } from 'react-native';
import { spacing } from '../../theme';
import { AppText } from '../atoms/AppText';
import { TextField } from '../atoms/TextField';

interface FormFieldProps extends TextInputProps {
  label: string;
}

/** A labelled text input — the "Name" and "Version" rows of the form. */
export const FormField = ({ label, ...inputProps }: FormFieldProps) => (
  <View style={styles.field}>
    <AppText variant="sectionLabel">{label}</AppText>
    <TextField {...inputProps} />
  </View>
);

const styles = StyleSheet.create({
  field: { gap: spacing.sm },
});
