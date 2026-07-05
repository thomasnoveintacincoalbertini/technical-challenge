import { act, renderHook, waitFor } from '@testing-library/react-native';
import { DocumentsRepository } from '../../api/documentsApi';
import { Document, NewDocumentInput } from '../../types/document';
import { useDocuments } from '../useDocuments';

const doc = (id: string): Document => ({
  id,
  title: `Doc ${id}`,
  version: '1.0.0',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
  attachments: [],
  contributors: [],
});

const makeRepo = (over: Partial<DocumentsRepository> = {}): DocumentsRepository => ({
  list: jest.fn().mockResolvedValue([doc('1'), doc('2')]),
  create: jest.fn((input: NewDocumentInput) =>
    Promise.resolve({ ...doc('new'), title: input.title }),
  ),
  ...over,
});

describe('useDocuments', () => {
  it('loads documents on mount', async () => {
    // Repository must be a stable reference — creating it inside the render
    // callback would change identity each render and loop the effect.
    const repo = makeRepo();
    const { result } = await renderHook(() => useDocuments(repo));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.documents).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('exposes an error message when loading fails', async () => {
    const repo = makeRepo({ list: jest.fn().mockRejectedValue(new Error('boom')) });
    const { result } = await renderHook(() => useDocuments(repo));

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.documents).toHaveLength(0);
  });

  it('prepends a newly created document', async () => {
    const repo = makeRepo();
    const { result } = await renderHook(() => useDocuments(repo));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addDocument({
        title: 'Fresh',
        version: '9.9.9',
        attachment: null,
      });
    });

    expect(result.current.documents).toHaveLength(3);
    expect(result.current.documents[0].title).toBe('Fresh');
  });
});
