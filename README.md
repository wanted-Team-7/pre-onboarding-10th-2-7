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
 - 로컬 캐싱을 state에서 관리하도록 구현했습니다.
 - 검색에 성공하면 검색어들을 key와 value로 state에 저장하고
 - 각각 setTimeout을 걸어서 시간이 지나면 자동으로 만료될 수 있도록 구현했습니다.
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

## 세부 동작
### 키보드 이벤트
- 키보드 이벤트가 있을 때마다 selectedItemIndex의 값 변화
- Math 메소드 이용해서 최소 최대 인덱스를 정해서 적절하게 인덱스를 조절함
```ts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedItemIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedItemIndex(prevIndex =>
        Math.min(prevIndex + 1, searchedResponse.length - 1, MAX_SEARCHED_RESULT_NUM - 1)
      );
    }
    if (e.key === 'Enter' && selectedItemIndex >= 0) {
      e.preventDefault();
      const selectedItem = searchedResponse[selectedItemIndex];
      if (selectedItem) {
        setSearchQuery(selectedItem.name);
        handleSearch(selectedItem.name);
      }
    }
  };
```

### 최근 검색어
- reverse()를 이용해서 가장 최근의 검색어가 가장 위에 위치하도록 조정
```ts
    <>
      <StyledText>최근 검색어</StyledText>
      {recentSearches
        .reverse()
        .slice(0, MAX_SEARCHED_RESULT_NUM)
        .map((item: string, index: number) => (
          <SearchedItem key={index} id={index} name={item} searchQuery={searchQuery} />
        ))}
    </>
```

### 컴포넌트 분리
- 기능을 담당하는 컴포넌트와 뷰를 담당하는 컴포넌트를 분리시킴
  - 코드 가독성 향상
  - 재사용성 증가
  - 코드 안정성 증가

### 폰트 추가
- 모든 사용자들이 다양한 환경에서 동일한 폰트를 사용할 수 있도록 파일을 다운로드 받아서 사용하게 했습니다.
- woff2, woff를 지원함으로 최신브라우저에 더 가벼운 용량의 폰트를 사용할 수 있도록 적용했습니다.
- 오래된 브라우저에서도 혹은 느린 네트워크 환경에서도 동일한 폰트가 동작할 수 있도록 ttf도 추가했습니다.
- 참고 웹사이트에서 검색창이 최상단에 없고 중간부터있어 글씨가 조금은 천천히 나와도 된다고 판단해서 다듬어진 폰트가 나올수 있도록 폰트가 다운로드 완료된 시점부터(3초 이후부터는 default) 글씨가 보일 수 있도록 font-display: block을 사용했습니다.

```js
    @font-face {
      font-family: NanumSquareNeo-Variable;
      src: url(${NanumSquareNeoWoff2}) format('woff2'),
          url(${NanumSquareNeoWoff}) format('woff'),
          url(${NanumSquareNeoTtf}) format('ttf');
      font-weight: normal;
      font-style: normal;
      font-display: block; //FOIT로 적용
    }
```