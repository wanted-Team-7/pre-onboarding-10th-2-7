
## 📃  검색창 구현
### 작성중

<br />

## 📃  로컬 캐 기능 구현
### 캐시 생성
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
- 스크립트 내부에서 클래스로 생성하였습니다.
- 검색어를 key로 하여 API 호출 결과 데이터와, 각 검색어를 캐싱할 때 `현재시간 + 만료시간`을 expire time으로 하는 cacheTime을 함께 저장합니다.
- isCacheTimeValid() 메소드로 해당 검색어의 캐시가 유효한 지(expire time) 확인할 수 있습니다.

### 캐싱
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
- 기존에 expire time을 아래와 같이 setTimeout으로 구현하였으나, 검색 횟수가 많아지면 그만큼 setTimeout 실행 횟수도 증가하여 성능 저하를 야기할 수 있어 위와 같이 수정하였습니다.
```jsx
// setTimeout으로 expire time을 구현
const caching = (key: string, data: ISearchData[]) => {
  cache[key] = data;
  setTimeout(() => {
    delete cache[key];
  }, CACHE_EXPIRE_TIME_SEC * 1000);
};
```

<br />

## 📃  디바운스 기능 구현
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
- 이펙트 훅이 실행될 때마다 이전의 setTimeout을 초기화합니다.

<br />

## 📃  키보드로 요소 이동  구현 
```jsx
// src/App.tsx

// ...
const [elIndexFocused, setElIndexFocused] = useState(-1);
  
const inputOnKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (searchData.length === 0 || (e.code !== 'ArrowUp' && e.code !== 'ArrowDown')) return;
    e.preventDefault();

    if (e.code === 'ArrowUp') {
      if (elIndexFocused <= 0) {
        setElIndexFocused(searchData.length - 1);
      } else {
        setElIndexFocused(prev => prev - 1);
      }
    }

    if (e.code === 'ArrowDown') {
      if (elIndexFocused === searchData.length - 1) {
        setElIndexFocused(0);
      } else {
        setElIndexFocused(prev => prev + 1);
      }
    }
};
// ...

// src/components/SearchResult.tsx
function SearchResult({ index, ... }) {
  //...
  return (
    <Li data-index={index} ...>
  // ...
    </Li>
  );
}
```
- inputOnKeyDownHandler 함수는 input 창에서 키보드를 입력하면 실행됩니다. 
- 이때, 검색 결과가 1개 이상 존재하고 입력된 키가 `화살표위` 혹은 `화살표아래`일 때만 동작하도록 하였습니다.
- 화살표 키를 누르면 검색 결과 개수 내에서 일정 숫자값(elIndexFocused)을 가집니다. 
- 요소에 data-index 속성값으로 배열 index를 전달하고 이 값과 elIndexFocused를 비교하여 일치하는 경우에 focusing style을 적용하도록 하였습니다.

```jsx
// src/App.tsx
const liMouseOverHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const { index } = e.currentTarget.dataset;
    if (index === undefined) return;
    if (+index === elIndexFocused) return;
    setElIndexFocused(+index);
};
```
- 검색 결과 요소 위에 마우스를 올려놓으면 focusing style을 적용시켰고, elIndexFocused를 공유하여 키보드에 의한 동작과 연동되도록 하였습니다.

<br />
