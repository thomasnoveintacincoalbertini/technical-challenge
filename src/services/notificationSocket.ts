import { NOTIFICATIONS_WS_URL, WS_RECONNECT_DELAY_MS } from '../config/env';
import { DocumentNotification } from '../types/document';

interface RawNotification {
  Timestamp: string;
  UserID: string;
  UserName: string;
  DocumentID: string;
  DocumentTitle: string;
}

const toNotification = (raw: RawNotification): DocumentNotification => ({
  timestamp: raw.Timestamp,
  userId: raw.UserID,
  userName: raw.UserName,
  documentId: raw.DocumentID,
  documentTitle: raw.DocumentTitle,
});

/**
 * Abstraction over the real-time transport. Hooks depend on this interface so
 * the websocket can be replaced with a fake in tests (DIP).
 */
export interface NotificationSocket {
  connect(onMessage: (notification: DocumentNotification) => void): void;
  disconnect(): void;
}

/**
 * Websocket-backed implementation with automatic reconnection. A closed socket
 * (server restart, network blip) is transparently reopened until `disconnect`
 * is called by the consumer.
 */
export const createNotificationSocket = (
  url: string = NOTIFICATIONS_WS_URL,
): NotificationSocket => {
  let socket: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let stopped = false;

  const open = (onMessage: (n: DocumentNotification) => void) => {
    socket = new WebSocket(url);

    socket.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data as string) as RawNotification;
        onMessage(toNotification(raw));
      } catch {
        /* ignore malformed frames */
      }
    };

    socket.onclose = () => {
      if (stopped) return;
      reconnectTimer = setTimeout(() => open(onMessage), WS_RECONNECT_DELAY_MS);
    };

    socket.onerror = () => socket?.close();
  };

  return {
    connect(onMessage) {
      stopped = false;
      open(onMessage);
    },
    disconnect() {
      stopped = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      socket?.close();
      socket = null;
    },
  };
};
