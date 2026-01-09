/**
 * Utility functions for cookie management
 */

/**
 * Check if a cookie exists
 */
export const hasCookie = (name: string): boolean => {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some(c => c.trim().startsWith(`${name}=`));
};

/**
 * Check if auth token cookie exists
 * Common cookie names for auth tokens
 */
export const hasAuthToken = (): boolean => {
  // Check for common auth cookie names
  const authCookieNames = ['token', 'authToken', 'jwt', 'accessToken', 'session'];
  return authCookieNames.some(name => hasCookie(name));
};

