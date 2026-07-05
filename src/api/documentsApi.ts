import { httpClient } from './httpClient';
import { DOCUMENTS_PATH } from '../config/env';
import { Document, NewDocumentInput } from '../types/document';

/**
 * The test server returns documents in PascalCase. These raw types stay local
 * to this module — the rest of the app only ever sees the camelCase `Document`.
 */
interface RawContributor {
  ID: string;
  Name: string;
}

interface RawDocument {
  ID: string;
  Title: string;
  Version: string;
  CreatedAt: string;
  UpdatedAt: string;
  Attachments: string[] | null;
  Contributors: RawContributor[] | null;
}

const toDocument = (raw: RawDocument): Document => ({
  id: raw.ID,
  title: raw.Title,
  version: raw.Version,
  createdAt: raw.CreatedAt,
  updatedAt: raw.UpdatedAt,
  attachments: raw.Attachments ?? [],
  contributors: (raw.Contributors ?? []).map((c) => ({ id: c.ID, name: c.Name })),
});

/**
 * Abstraction over the documents data source. UI/hooks depend on this interface,
 * not on axios — so the transport can be swapped or mocked (DIP).
 */
export interface DocumentsRepository {
  list(): Promise<Document[]>;
  create(input: NewDocumentInput): Promise<Document>;
}

export const documentsApi: DocumentsRepository = {
  async list() {
    const { data } = await httpClient.get<RawDocument[] | null>(DOCUMENTS_PATH);
    return (data ?? []).map(toDocument);
  },

  /**
   * The mock server generates random data and does not persist writes, so we
   * POST for realism (and to exercise the endpoint) but build the created
   * document locally. Swallowing the network error keeps creation working
   * offline — the doc is still added optimistically to the local list.
   */
  async create(input) {
    const attachments = input.attachment ? [input.attachment] : [];
    await httpClient
      .post(DOCUMENTS_PATH, {
        Title: input.title,
        Version: input.version,
        Attachments: attachments,
      })
      .catch(() => undefined);

    const now = new Date().toISOString();
    return {
      id: `local-${now}`,
      title: input.title,
      version: input.version,
      createdAt: now,
      updatedAt: now,
      attachments,
      contributors: [],
    };
  },
};
