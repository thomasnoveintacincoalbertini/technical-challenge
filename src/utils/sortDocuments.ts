import { Document } from '../types/document';

export type SortKey = 'recent' | 'title' | 'version';

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Most recent' },
  { key: 'title', label: 'Name' },
  { key: 'version', label: 'Version' },
];

const comparators: Record<SortKey, (a: Document, b: Document) => number> = {
  recent: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  title: (a, b) => a.title.localeCompare(b.title),
  version: (a, b) => a.version.localeCompare(b.version, undefined, { numeric: true }),
};

/** Returns a new sorted array; never mutates the input. */
export const sortDocuments = (documents: Document[], key: SortKey): Document[] =>
  [...documents].sort(comparators[key]);
