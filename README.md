
# 🔍 Search App
- **프로젝트 기간:** 2023.05.02 ~ 2023.05. 05
- **배포링크:** https://beamish-paletas-db66f4.netlify.app/


## ⚙️ 실행 방법

```bash
$ npm install
$ npm start
```
*api url 설정 방법 기입


## 👨‍💻👩‍💻 팀원 목록

| 이름   | GitHub Repository                                       |
| ------ | ------------------------------------------------------ |
| 이지윤 | [@1yoouoo](https://github.com/1yoouoo)                   |
| 우상헌 | [@Withlaw](https://github.com/Withlaw)                   |
| 권민영 | [@minnyoung](https://github.com/minnyoung)               |
| 유재형 | [@JwithYOU](https://github.com/JwithYOU)                 |
| 박정도 | [@jeongdopark](https://github.com/jeongdopark)           |
| 김희진 | [@Jinnie-kim](https://github.com/Jinnie-kim)             |
| 정승연 | [@xxyeon129](https://github.com/xxyeon129)               |
| 이준용 | [@leejy001](https://github.com/leejy001)                 |


## 🚀 구현 기능

### 1️⃣ 검색창 UI 구현하기


- 검색 요청시 `검색중...`이 나타나도록 하였습니다.
- 검색어가 없을 시 `검색어 없음`이 나타나도록 하였습니다.
- 추천 검색어에서 사용자가 입력한 값을 `강조`처리하였습니다.
- 추천 검색어 포커싱 효과를 `키보드 상하키 입력` 이벤트와 `마우스 hover` 이벤트에 함께 적용하였습니다.
- 처음 추천 검색어에서 `화살표위`키를 누르면 마지막 추천 검색어로 이동하고, 마지막 추천 검색어에서 `화살표아래`키를 누르면 처음 추천 검색어로 이동하도록 하였습니다.
- 원하는 검색어가 없으면 `esc`키를 눌러 검색어를 초기화 할 수 있도록 하였습니다.

---

<br />

### 2️⃣ API 호출별로 로컬 캐싱하기

<details>
<summary>캐싱이란?</summary>
<div>

- 캐싱은 파일 복사본을 캐시 또는 임시 저장 위치에 저장하여 보다 빠르게 액세스할 수 있도록 하는 프로세스입니다.


  
#### 캐싱의 이점

- 캐싱을 사용하면 처리량을 크게 높이고 백엔드 데이터베이스와 관련한 데이터 검색 지연 시간을 줄일 수 있으므로 애플리케이션의 **전반적인 성능이 향상**됩니다. 
- 모든 클라이언트를 서비스할 필요가 없어지므로 **서버의 부하를 완화**합니다.
- 캐싱을 사용하면 이전에 검색하거나 계산한 데이터를 효율적으로 **재사용**할 수 있습니다.

</div>
</details>


> 캐시 생성


```ts
// src/cache/searchDataCache.ts
class SearchDataCache {
  private cache: {
    [key: string]: ISearchData[];
  } = {};

  private cacheTime: { [key: string]: number } = {};

  get(key: string) {
    return this.cache[key];
  }

  add(key: string, data: ISearchData[]) {
    this.cache[key] = data;
    this.cacheTime[key] = new Date().getTime() + CACHE_EXPIRE_TIME_SEC * 1000;
  }

  isCacheTimeValid(key: string) {
    const currentTime = new Date().getTime();
    return currentTime < this.cacheTime[key];
  }
}

export default new SearchDataCache();
```
- 캐시는 스크립트 내부에서 클래스로 생성하였습니다.
- 검색어를 key로 하여 API 호출 결과 데이터와, 각 검색어를 캐싱할 때 `현재시간 + 만료시간`을 expire time으로 하는 cacheTime을 함께 저장합니다.
- 캐시 만료 시간은 `CACHE_EXPIRE_TIME_SEC`로 변수화하여 관리합니다.
- isCacheTimeValid() 메소드로 해당 검색어의 캐시가 유효한 지(expire time) 확인할 수 있습니다.

<br />

> 검색 결과값 캐싱
```jsx
// src/apis/searchAPI.ts
export const getSearchData = async (keyword: string) => {
  // ...
  if (searchDataCache.isCacheTimeValid(keyword)) return searchDataCache.get(keyword); // 캐시 확인

  try {
    const res = await axios.get<ISearchData[]>(`/api/v1/search-conditions/?name=${keyword}`);
    console.info('calling api');

    if (res.statusText !== 'OK') throw new Error(`${res.statusText} (${res.status})`);

    const data = res.data.slice(0, 7);
    searchDataCache.add(keyword, data); // 캐싱
    return data;
    // ...
};
```
- API를 호출할 때 해당 검색어가 캐시에 저장되었는지, 저장되었다면 만료기간이 지났는지 확인합니다. (캐시가 존재하지 않으면 isCacheTimeValid()가 false를 반환합니다.)
- 유효한 캐시가 존재하면 캐시된 값을 반환하고, 존재하지 않으면 새로 API를 호출하고 그 값을 다시 캐싱합니다.

<br />

<details>
<summary>다른 캐시 구현 방법 살펴보기</summary>
<div>
  
<br />
  
> cache API 사용
  
```tsx
import axios from 'axios';

const CAHCE_NAME = 'search-result';

export const getSearchResult = async (word: string) => {
  const URL = `/api/v1/search-conditions/?name=${word}`;
  const cachedData = await caches.match(URL);

  if (word.trim().length === 0) return [];

  if (cachedData) {
    const cachedDataList = await cachedData.json();
    return cachedDataList.slice(0, 7);
  }

  try {
    const res = await axios.get(URL);

    console.info('calling api', res);

    if (res.status !== 200) return;

    caches.open(CAHCE_NAME).then(cache => {
      cache.add(URL);
    });

    const result = res.data.slice(0, 7);

    return result;
  } catch (error) {
    console.error(error);
  }
};
```
  <br />
  
  > Local Storage 사용
  
  ```ts
export const getSearchWord = async (word: string) => {
  if (word === '') return [];
  const checkCache: string | null = localStorage.getItem(word);

  if (!checkCache) {
    console.info('api 호출');
    const response = await axios.get(API_URL, { params: { name: word } });
    const setData = {
      data: response.data,
      expireTime: new Date().getTime() + EXPIRE_TIME,
    };

    localStorage.setItem(word, JSON.stringify(setData));
    return response.data;
  } else {
    return JSON.parse(checkCache).data;
  }
};
```

<br />
  
  > useCache 커스텀 훅 생성
  
```ts
import { useState } from 'react';
import { SearchResultTypes } from '../types/search';
import { CacheType } from '../types/cache';
import { ONE_MINUTE } from '../constants';

export const useCache = () => {
  const [cache, setCache] = useState<CacheType[]>([]);

  const addCache = (key: string, value: SearchResultTypes[]) => {
    const newCache: CacheType = { key, value };
    setCache(prev => [...prev, newCache]);

    setTimeout(() => {
      setCache(prev => prev.filter(item => item.key !== newCache.key));
    }, ONE_MINUTE);
  };

  const getCache = (key: string) => {
    const curCache = cache.find(item => item.key === key);
    return curCache ? curCache.value : null;
  };

  return { addCache, getCache };
};

export default useCache;
  
// useCache 적용
const handleFetchSearchResult = async () => {
  // ...
  const data = getCache(search);
  if (data !== null) {
    setSearchResult(data);
    setIndex(-1);
    return;
  }
  const { data: result } = await searchApi(debouncedSearch);
  addCache(search, result);
  setSearchResult(result);
  setIndex(-1);
};
```
  
  

</div>
</details>


<details>
<summary>다른 캐시 무효화 방법 살펴보기</summary>
<div>

  
<br />

> setTimeout으로 일정 시간이 지나면 캐시 제거

```jsx
const caching = (key: string, data: ISearchData[]) => {
  cache[key] = data;
  setTimeout(() => {
    delete cache[key];
  }, CACHE_EXPIRE_TIME_SEC * 1000);
};
```  

<br />

> setInterval을 사용하여 일정 시간마다 Localstorage에 있는 데이터들의 만료 시간을 체크하고 만료 시간이 지난 데이터 제거

```ts
export const handleExpireCache = () => {
  setInterval(() => {
    // 만료시간 지난 캐시 삭제
    console.log('expire');
    for (let elem in localStorage) {
      const cache = localStorage.getItem(elem);
      const localStorageElem: StorageItem = JSON.parse(cache!);
      if (localStorageElem?.expireTime && localStorageElem?.expireTime <= Date.now()) {
        localStorage.removeItem(elem);
      }
    }
  }, CHECK_CACHE_TIME);
};
```




</div>
</details>

---
  
<br />

### 3️⃣ 디바운스로 API 호출 횟수 줄이기
  
```jsx
// src/App.tsx
useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      try {
        const data = await getSearchData(searchKeyword);
        setSearchData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch error! ', error);
      }
    }, DEBOUNCE_TIMEOUT_SEC * 1000);
    return () => clearTimeout(debounceTimeout);
}, [searchKeyword]);
```
- input 창에 검색어를 입력하면 searchKeyword state가 변화하고 위 이펙트 훅이 실행됩니다.
- setTimeout을 통해 반복된 getSearchData() 실행을 지연시킵니다.
- 지연시간은 `DEBOUNCE_TIMEOUT_SEC`로 변수화하여 관리합니다.
- 이펙트 훅이 실행될 때마다 이전의 setTimeout 설정을 제거합니다.

---
  
<br />

### 4️⃣ 키보드만으로 요소 이동하기

```jsx
// src/App.tsx

// ...
const [elIndexFocused, setElIndexFocused] = useState(-1);
  
const inputOnKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const keyArr = ['ArrowUp', 'ArrowDown', 'Escape'];

  if (event.nativeEvent.isComposing) return;
  if (searchData.length === 0 || !keyArr.includes(event.key)) return;
  
  event.preventDefault();

  switch (event.key) {
    case 'ArrowUp':
      handleArrowUpKey();
      break;
    case 'ArrowDown':
      handleArrowDownKey();
      break;
    case 'Escape':
      handleEscapeKey();    
      break;
  }
};


// src/components/SearchResult.tsx
function SearchResult({ index, ... }) {
  //...
  return (
    <Li data-index={index} isFocus={[index, elIndexFocused]} ... >
      {...}
    </Li>
  );
}
  
const Li = styled.li<{ isFocus: [number, number] }>`
  // ...
  background-color: ${props => (props.isFocus[0] === props.isFocus[1] ? '#90cdf4' : 'inherit')};
`;
```
- inputOnKeyDownHandler 함수는 input 창에서 키보드를 입력하면 실행됩니다. 
- 이때, 검색 결과가 1개 이상 존재하고 입력된 키가 `화살표위` 혹은 `화살표아래`일 때만 동작하도록 하였습니다.
- 화살표 키를 누르면 검색 결과 개수 내에서 일정 숫자값(elIndexFocused)을 가집니다. 
- 요소에 data-index 속성값으로 배열 index를 전달하고 이 값과 elIndexFocused를 비교하여 일치하는 경우에 focusing style을 적용하도록 하였습니다.
  

<br />
  
```jsx
// src/App.tsx
const liMouseOverHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const { index } = e.currentTarget.dataset;
    if (index === undefined) return;
    if (+index === elIndexFocused) return;
    setElIndexFocused(+index);
};
```
- 마우스 hover 효과와 연동하여 UX를 개선하였습니다.
- 추천 검색어 위에 마우스를 올려놓으면 키보드 입력과 같은 방법으로 focusing style이 적용되고, elIndexFocused를 공유하여 키보드 동작과 연동되도록 하였습니다.

<br />
