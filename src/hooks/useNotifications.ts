import { useCallback, useEffect, useState } from 'react';
import {
  createNotificationSocket,
  NotificationSocket,
} from '../services/notificationSocket';
import { DocumentNotification } from '../types/document';

const MAX_STORED = 50;

export interface UseNotifications {
  notifications: DocumentNotification[];
  unreadCount: number;
  latest: DocumentNotification | null;
  markAllRead: () => void;
}

/**
 * Subscribes to the real-time notification stream for the lifetime of the
 * component. Keeps a capped history, an unread counter (drives the badge) and
 * the latest event (drives the in-app banner). The socket factory is injectable
 * for testing.
 */
export const useNotifications = (
  socketFactory: () => NotificationSocket = createNotificationSocket,
): UseNotifications => {
  const [notifications, setNotifications] = useState<DocumentNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [latest, setLatest] = useState<DocumentNotification | null>(null);

  useEffect(() => {
    const socket = socketFactory();
    socket.connect((notification) => {
      setNotifications((prev) => [notification, ...prev].slice(0, MAX_STORED));
      setUnreadCount((count) => count + 1);
      setLatest(notification);
    });
    return () => socket.disconnect();
  }, [socketFactory]);

  const markAllRead = useCallback(() => setUnreadCount(0), []);

  return { notifications, unreadCount, latest, markAllRead };
};
