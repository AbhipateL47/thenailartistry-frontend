/**
 * Domain detection utilities
 * Detects whether user is on customer or admin domain
 */

export type DomainType = 'customer' | 'admin';

/**
 * Get the current domain type based on hostname
 * @returns 'customer' or 'admin'
 */
export const getDomainType = (): DomainType => {
  if (typeof window === 'undefined') {
    return 'customer'; // SSR fallback
  }
  
  const hostname = window.location.hostname.toLowerCase();
  
  // Check if hostname starts with 'admin.'
  if (hostname.startsWith('admin.')) {
    return 'admin';
  }
  
  return 'customer';
};

/**
 * Check if current domain is admin subdomain
 * @returns true if on admin.thenailartistry.store
 */
export const isAdminDomain = (): boolean => {
  return getDomainType() === 'admin';
};

/**
 * Check if current domain is customer site
 * @returns true if on thenailartistry.store
 */
export const isCustomerDomain = (): boolean => {
  return getDomainType() === 'customer';
};

/**
 * Get the base domain (without subdomain)
 * @returns e.g., 'thenailartistry.store'
 */
export const getBaseDomain = (): string => {
  if (typeof window === 'undefined') {
    return 'thenailartistry.store';
  }
  
  const hostname = window.location.hostname.toLowerCase();
  
  // Remove 'admin.' prefix if present
  if (hostname.startsWith('admin.')) {
    return hostname.replace('admin.', '');
  }
  
  // Remove 'www.' prefix if present
  if (hostname.startsWith('www.')) {
    return hostname.replace('www.', '');
  }
  
  return hostname;
};


