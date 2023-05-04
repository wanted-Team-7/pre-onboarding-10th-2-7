# 이지윤

## 폴더 구조
```
📦src
 ┣ 📂API
 ┃ ┣ 📜API.ts
 ┃ ┗ 📜customAPI.ts
 ┣ 📂assets
 ┃ ┗ 📜SearchSVG.tsx
 ┣ 📂components
 ┃ ┣ 📜SearchBar.tsx
 ┃ ┣ 📜SearchedItem.tsx
 ┃ ┗ 📜SearchedList.tsx
 ┣ 📂fonts
 ┃ ┣ 📜FontStyles.js
 ┃ ┣ 📜NanumSquareNeo.ttf
 ┃ ┣ 📜NanumSquareNeo.woff
 ┃ ┗ 📜NanumSquareNeo.woff2
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.tsx
 ┃ ┣ 📜useExpirationCache.tsx
 ┃ ┗ 📜useSearch.tsx
 ┣ 📂utils
 ┃ ┗ 📜constants.ts
 ┣ 📂views
 ┃ ┣ 📜RecentSearches.tsx
 ┃ ┣ 📜RecommendedSearches.tsx
 ┃ ┣ 📜SearchInputPlaceholder.tsx
 ┃ ┗ 📜SearchItem.tsx
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜setupProxy.js
 ```


 ## Hooks

 ### useDebounce

 ```ts
 import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

 ```

 ### useExpirationCache
 ```ts
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
```

### useSearch
```ts
import React, { useState, useEffect } from 'react';
import API from '../API/API';
import useDebounce from './useDebounce';
import useExpirationCache from './useExpirationCache';
import { SearchedResponseItem } from '../App';
import { ONE_HOUR } from '../utils/constants';

interface UseSearchProps {
  searchQuery: string;
  debounceDelay: number;
}

const useSearch = ({ searchQuery, debounceDelay }: UseSearchProps) => {
  const [searchedResponse, setSearchedResponse] = useState<SearchedResponseItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchQuery, debounceDelay);
  const { addItem, getItem } = useExpirationCache();

  const checkCacheAndSetResponse = (searchQuery: string) => {
    const cachedValue = getItem(searchQuery);

    if (cachedValue) {
      setSearchedResponse(cachedValue);
      setIsSearching(false);
      return true;
    }
    return false;
  };

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() !== '') {
      const isCached = checkCacheAndSetResponse(searchQuery);

      if (!isCached) {
        setIsSearching(true);
        const response = await API.search({ name: searchQuery });
        setSearchedResponse(response.data);
        setIsSearching(false);
        addItem(searchQuery, response.data, ONE_HOUR);
      }
    }
  };

  const getSearchData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await handleSearch(searchQuery);

    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recentSearches.push(searchQuery);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

    addItem(searchQuery, searchedResponse, ONE_HOUR);
  };

  useEffect(() => {
    const isNotEmpty = debouncedSearchTerm.trim() !== '';

    isNotEmpty && handleSearch(debouncedSearchTerm);
    // FIXME
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return {
    searchedResponse,
    isSearching,
    handleSearch,
    getSearchData,
  };
};

export default useSearch;

```


## 기능 요약
1. 검색 UX
    - 검색창 포커스 인 
        - 인풋값 있을 때 -> 추천 검색 리스트
        - 인풋값 없을 때 -> 최근 검색 리스트

    - 검색창 포커스 아웃 -> 검색 리스트 숨김
    - 검색결과와 인풋값이 동일한 부분 빨간색으로 색상 변경
    - 키를 이용해서 추천 검색어 이동가능
        - 엔터키 누르면 인풋값으로 들어감

2. API호출 최소화
    - 디바운스 -> 0.5초마다 입력이 종료되면 호출
    - 캐싱
        - API호출 할 때마다 결과값 캐싱
        - 같은 검색어 입력시 캐싱된 결과 반환
        - 1시간뒤에 순서대로 만료