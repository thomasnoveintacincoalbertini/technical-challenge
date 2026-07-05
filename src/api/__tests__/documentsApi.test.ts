import { documentsApi } from '../documentsApi';
import { httpClient } from '../httpClient';

jest.mock('../httpClient', () => ({
  httpClient: { get: jest.fn(), post: jest.fn() },
}));

const mockedGet = httpClient.get as jest.Mock;
const mockedPost = httpClient.post as jest.Mock;

describe('documentsApi', () => {
  beforeEach(() => {
    mockedGet.mockReset();
    mockedPost.mockReset();
  });

  describe('list', () => {
    it('maps the PascalCase server shape to the domain model', async () => {
      mockedGet.mockResolvedValue({
        data: [
          {
            ID: '1',
            Title: 'Hop Rod Rye',
            Version: '2.6.16',
            CreatedAt: '2020-08-12T07:30:08Z',
            UpdatedAt: '2020-08-12T07:30:08Z',
            Attachments: ['Porter'],
            Contributors: [{ ID: 'u1', Name: 'Carlie Abott' }],
          },
        ],
      });

      const [doc] = await documentsApi.list();

      expect(doc).toEqual({
        id: '1',
        title: 'Hop Rod Rye',
        version: '2.6.16',
        createdAt: '2020-08-12T07:30:08Z',
        updatedAt: '2020-08-12T07:30:08Z',
        attachments: ['Porter'],
        contributors: [{ id: 'u1', name: 'Carlie Abott' }],
      });
    });

    it('tolerates null collections and a null payload', async () => {
      mockedGet.mockResolvedValueOnce({
        data: [{ ID: '1', Title: 'X', Version: '1', CreatedAt: '', UpdatedAt: '', Attachments: null, Contributors: null }],
      });
      const [doc] = await documentsApi.list();
      expect(doc.attachments).toEqual([]);
      expect(doc.contributors).toEqual([]);

      mockedGet.mockResolvedValueOnce({ data: null });
      expect(await documentsApi.list()).toEqual([]);
    });
  });

  describe('create', () => {
    it('posts the payload and returns a locally-built document', async () => {
      mockedPost.mockResolvedValue({ data: {} });

      const doc = await documentsApi.create({
        title: 'New Doc',
        version: '1.0.0',
        attachment: 'spec.pdf',
      });

      expect(mockedPost).toHaveBeenCalledWith('/documents', {
        Title: 'New Doc',
        Version: '1.0.0',
        Attachments: ['spec.pdf'],
      });
      expect(doc.title).toBe('New Doc');
      expect(doc.version).toBe('1.0.0');
      expect(doc.attachments).toEqual(['spec.pdf']);
      expect(doc.id).toContain('local-');
    });

    it('still returns a document when the network write fails (offline)', async () => {
      mockedPost.mockRejectedValue(new Error('offline'));

      const doc = await documentsApi.create({
        title: 'Offline Doc',
        version: '2.0.0',
        attachment: null,
      });

      expect(doc.title).toBe('Offline Doc');
      expect(doc.attachments).toEqual([]);
    });
  });
});
