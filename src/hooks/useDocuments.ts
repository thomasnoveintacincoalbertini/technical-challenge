import { useCallback, useEffect, useState } from 'react';
import { documentsApi, DocumentsRepository } from '../api/documentsApi';
import { Document, NewDocumentInput } from '../types/document';

export interface UseDocuments {
  documents: Document[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addDocument: (input: NewDocumentInput) => Promise<Document>;
}

/**
 * Owns the document collection: initial load, pull-to-refresh and optimistic
 * creation. The repository is injected (defaulting to the real one) so the hook
 * can be unit-tested against a fake without any network.
 */
export const useDocuments = (
  repository: DocumentsRepository = documentsApi,
): UseDocuments => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (mode: 'initial' | 'refresh') => {
      if (mode === 'refresh') setRefreshing(true);
      else setLoading(true);
      setError(null);
      try {
        setDocuments(await repository.list());
      } catch {
        setError('Unable to load documents. Pull to retry.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [repository],
  );

  useEffect(() => {
    load('initial');
  }, [load]);

  const refresh = useCallback(() => load('refresh'), [load]);

  const addDocument = useCallback(
    async (input: NewDocumentInput) => {
      const created = await repository.create(input);
      setDocuments((prev) => [created, ...prev]);
      return created;
    },
    [repository],
  );

  return { documents, loading, refreshing, error, refresh, addDocument };
};
