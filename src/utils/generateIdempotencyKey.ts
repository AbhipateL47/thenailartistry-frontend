/**
 * Generates a unique idempotency key for payment requests
 * Format: {timestamp}-{random}-{hash}
 */
export const generateIdempotencyKey = (orderId: string, amount: number): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const hash = btoa(`${orderId}-${amount}-${timestamp}-${random}`)
    .substring(0, 16)
    .replace(/[^a-zA-Z0-9]/g, '');
  
  return `pay-${timestamp}-${random}-${hash}`;
};

