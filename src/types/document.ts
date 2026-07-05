/** Domain models used across the app (camelCase, decoupled from the API shape). */

export interface Contributor {
  id: string;
  name: string;
}

export interface Document {
  id: string;
  title: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  attachments: string[];
  contributors: Contributor[];
}

/** Real-time event received over the websocket when another user creates a doc. */
export interface DocumentNotification {
  timestamp: string;
  userId: string;
  userName: string;
  documentId: string;
  documentTitle: string;
}

/** User-provided data from the "Add document" form. */
export interface NewDocumentInput {
  title: string;
  version: string;
  attachment: string | null;
}
