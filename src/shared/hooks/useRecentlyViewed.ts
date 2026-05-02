import { useEffect, useState } from 'react';
import { Product } from '@/features/products/services/product.service';

const STORAGE_KEY = 'recently_viewed';
const MAX_ITEMS = 10;

function getStoredProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Product[]) : [];
  } catch {
    return [];
  }
}

function addToStorage(product: Product): void {
  const updated = [product, ...getStoredProducts().filter((p) => p._id !== product._id)].slice(
    0,
    MAX_ITEMS
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage quota exceeded — fail silently
  }
}

export function useRecentlyViewed(currentProduct?: Product): Product[] {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!currentProduct) return;
    addToStorage(currentProduct);
    setRecentProducts(getStoredProducts().filter((p) => p._id !== currentProduct._id));
  }, [currentProduct?._id]);

  return recentProducts;
}
