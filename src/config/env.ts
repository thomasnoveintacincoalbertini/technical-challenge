/**
 * Runtime configuration. Everything network-related is driven from here so the
 * app can point at any server (local, emulator host, CI) without code changes.
 *
 * Override at build/run time with Expo public env vars, e.g.:
 *   EXPO_PUBLIC_API_BASE_URL=http://192.168.1.20:8080 npx expo start
 */
const DEFAULT_API_BASE_URL = 'http://localhost:8080';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export const DOCUMENTS_PATH = '/documents';

export const NOTIFICATIONS_WS_URL =
  process.env.EXPO_PUBLIC_WS_URL ??
  `${API_BASE_URL.replace(/^http/, 'ws')}/notifications`;

/** Delay before attempting to reopen a dropped websocket. */
export const WS_RECONNECT_DELAY_MS = 2000;

/** HTTP request timeout. */
export const HTTP_TIMEOUT_MS = 10000;
