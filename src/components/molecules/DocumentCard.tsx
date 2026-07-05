import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { Document } from '../../types/document';
import { formatRelativeTime } from '../../utils/relativeTime';
import { AppText } from '../atoms/AppText';
import { Card } from '../atoms/Card';
import { ViewMode } from './ViewToggle';
import { InfoColumn } from './InfoColumn';

interface DocumentCardProps {
  document: Document;
  mode: ViewMode;
  onLongPress?: () => void;
}

/**
 * Renders a document as either a compact grid tile (title + version) or an
 * expanded list row (adds Contributors and Attachments columns), matching the
 * two mockups. A relative "created" time is shown when available.
 */
export const DocumentCard = ({
  document,
  mode,
  onLongPress,
}: DocumentCardProps) => {
  const createdAgo = formatRelativeTime(document.createdAt);

  return (
    <Card onLongPress={onLongPress} testID={`document-card-${document.id}`}>
      <View style={styles.titleRow}>
        <AppText variant="cardTitle" numberOfLines={1} style={styles.title}>
          {document.title}
        </AppText>
        <AppText variant="version">Version {document.version}</AppText>
      </View>

      {mode === 'list' ? (
        <>
          <View style={styles.columns}>
            <InfoColumn
              icon="users"
              title="Contributors"
              items={document.contributors.map((c) => c.name)}
            />
            <InfoColumn
              icon="link"
              title="Attachments"
              items={document.attachments}
            />
          </View>
          {createdAgo ? (
            <AppText variant="bodyMuted" style={styles.timestamp}>
              Created {createdAgo}
            </AppText>
          ) : null}
        </>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  title: { flexShrink: 1 },
  columns: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  timestamp: { marginTop: spacing.lg },
});
