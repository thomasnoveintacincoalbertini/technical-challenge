import axios from 'axios';
import { API_BASE_URL, HTTP_TIMEOUT_MS } from '../config/env';

/**
 * Single pre-configured axios instance shared by every repository.
 * Centralising it here means base URL, timeout, headers and future concerns
 * (auth, logging, retries) are defined in one place.
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: HTTP_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});
