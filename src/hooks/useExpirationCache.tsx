import { useState } from 'react';

interface CacheItem {
  key: string;
  value: any;
  expirationTime: number;
}

const useExpirationCache = (initialCache: CacheItem[] = []) => {
  const [cache, setCache] = useState<CacheItem[]>(initialCache);

  const addItem = (key: string, value: any, expirationTime: number) => {
    const newItem: CacheItem = { key, value, expirationTime: Date.now() + expirationTime };
    setCache(prevCache => [...prevCache, newItem]);

    setTimeout(() => {
      setCache(prevCache => prevCache.filter(c => c !== newItem));
    }, expirationTime);
  };

  const getItem = (key: string) => {
    const foundItem = cache.find(c => c.key === key);
    return foundItem ? foundItem.value : null;
  };

  return { addItem, getItem };
};

export default useExpirationCache;
