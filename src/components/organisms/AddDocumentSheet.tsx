import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { spacing } from '../../theme';
import { NewDocumentInput } from '../../types/document';
import { AppText } from '../atoms/AppText';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { BottomSheet } from './BottomSheet';

interface AddDocumentSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (input: NewDocumentInput) => Promise<void>;
}

/** "Add document" form in a bottom sheet: name, version, file picker, submit. */
export const AddDocumentSheet = ({
  visible,
  onClose,
  onSubmit,
}: AddDocumentSheetProps) => {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim().length > 0 && version.trim().length > 0;

  const reset = () => {
    setName('');
    setVersion('');
    setFileName(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    if (!result.canceled && result.assets.length > 0) {
      setFileName(result.assets[0].name);
    }
  };

  const submit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: name.trim(),
        version: version.trim(),
        attachment: fileName,
      });
      reset();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BottomSheet visible={visible} title="Add document" onClose={close}>
      <View style={styles.form}>
        <AppText variant="sectionLabel">Document informations</AppText>

        <FormField
          label="Name"
          placeholder="Placeholder"
          value={name}
          onChangeText={setName}
          autoCapitalize="sentences"
          returnKeyType="next"
        />

        <FormField
          label="Version"
          placeholder="Placeholder"
          value={version}
          onChangeText={setVersion}
          autoCapitalize="none"
        />

        <View style={styles.fileField}>
          <AppText variant="sectionLabel">File</AppText>
          <Button
            label={fileName ?? 'Choose file'}
            icon="file-text"
            variant="outline"
            onPress={pickFile}
          />
        </View>

        <Button
          label="Submit"
          onPress={submit}
          disabled={!canSubmit}
          loading={submitting}
          testID="submit-document"
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  form: { gap: spacing.xl },
  fileField: { gap: spacing.sm },
});
