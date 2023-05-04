import { DataItem } from '../types/types';

const prefixKeyword = 'caching--';

const createCacheStorage = () => {
  const cacheStorage = {
    getServerData: (urlParameter: string) => {
      try {
        const cachedItem = JSON.parse(
          localStorage.getItem(`${prefixKeyword}${decodeURI(urlParameter)}`) || ''
        );

        return cachedItem.value;
      } catch (error) {
        return null;
      }
    },
    setStorageItem: (urlParameter: string, value: DataItem) => {
      localStorage.setItem(`${prefixKeyword}${decodeURI(urlParameter)}`, JSON.stringify({ value }));
    },
  };

  return cacheStorage;
};

export const cacheStorage = createCacheStorage();
