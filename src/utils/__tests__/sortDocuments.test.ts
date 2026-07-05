import { Document } from '../../types/document';
import { sortDocuments } from '../sortDocuments';

const makeDoc = (over: Partial<Document>): Document => ({
  id: 'id',
  title: 'Title',
  version: '1.0.0',
  createdAt: '2020-01-01T00:00:00.000Z',
  updatedAt: '2020-01-01T00:00:00.000Z',
  attachments: [],
  contributors: [],
  ...over,
});

const docs: Document[] = [
  makeDoc({ id: 'a', title: 'Stone IPA', version: '3.8.11', createdAt: '2020-02-01T00:00:00Z' }),
  makeDoc({ id: 'b', title: 'Hop Rod Rye', version: '2.6.16', createdAt: '2020-03-01T00:00:00Z' }),
  makeDoc({ id: 'c', title: 'Amber Ale', version: '10.0.0', createdAt: '2020-01-01T00:00:00Z' }),
];

describe('sortDocuments', () => {
  it('orders by most recent first', () => {
    expect(sortDocuments(docs, 'recent').map((d) => d.id)).toEqual(['b', 'a', 'c']);
  });

  it('orders alphabetically by title', () => {
    expect(sortDocuments(docs, 'title').map((d) => d.title)).toEqual([
      'Amber Ale',
      'Hop Rod Rye',
      'Stone IPA',
    ]);
  });

  it('orders by version numerically, not lexicographically', () => {
    expect(sortDocuments(docs, 'version').map((d) => d.version)).toEqual([
      '2.6.16',
      '3.8.11',
      '10.0.0',
    ]);
  });

  it('does not mutate the input array', () => {
    const input = [...docs];
    sortDocuments(input, 'title');
    expect(input.map((d) => d.id)).toEqual(['a', 'b', 'c']);
  });
});
