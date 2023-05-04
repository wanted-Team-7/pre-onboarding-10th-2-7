
# 원티드 프리온보딩 프론트엔드 7팀 2주차 과제

- **프로젝트 기간:** 2023년 5월 2일 ~ 2023년 5월 5일


<br />

## ⌨️  프로젝트 실행 방법
```bash
$ npm install
$ npm start
```

<br />

## 📚 과제
- 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

<br />


## 기초 지식
### 캐싱이란?
캐싱은 파일 복사본을 캐시 또는 임시 저장 위치에 저장하여 보다 빠르게 액세스할 수 있도록 하는 프로세스입니다.
### 캐싱의 이점

- 캐싱을 사용하면 처리량을 크게 높이고 백엔드 데이터베이스와 관련한 데이터 검색 지연 시간을 줄일 수 있으므로 애플리케이션의 **전반적인 성능이 향상**됩니다. 
- 모든 클라이언트를 서비스할 필요가 없어지므로 **서버의 부하를 완화**합니다.
- 캐싱을 사용하면 이전에 검색하거나 계산한 데이터를 효율적으로 **재사용**할 수 있습니다.

<br />

## 주요 기능

### 1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
```tsx
/* SearchSection.tsx */

const [searchResults, setSearchResults] = useState<ResultsType[]>([]);
const searchTerm = useDebounce(searchInput, 500);

async function onSearchData() {
    const response = await getSearchResults(searchTerm);
    setSearchResults(response);
    addSearchResultStore(response, searchTerm);
  }

useEffect(() => {
    if (searchTerm !== '') {
        const storeSearchList = searchResultStore.find(
        searchItem => searchItem.searchTerm === searchTerm
        )?.resultList;

        if (storeSearchList) {
        setSearchResults(storeSearchList);
        } else onSearchData();
    } else setSearchResults([]);
}, [searchTerm]);


/* searchApis.ts */

export const getSearchResults = async (SearchTerm: string) => {
  try {
    if (SearchTerm) {
      const response = await axios.get(`api/v1/search-conditions/?name=${SearchTerm}`);
      console.info('calling api');
      return response.data;
    }
    return undefined;
  } catch {
    alert('결과를 불러오는 중 에러가 발생했습니다.');
  }
};


/* useDebounce.ts */

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

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
구현방법
- 입력마다 API 호출하지 않도록 useDebounce custom hook을 생성하여 검색어에 debounce를 적용하였습니다.

- 사용자가 검색어 입력을 시작한 후 500ms동안 입력이 없으면 API가 호출되도록 구현했습니다.

- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정했습니다.


<br />

### 2. API 호출별로 로컬 캐싱 구현
```tsx
/* useCache.ts */

export default function useCache() {
  const [searchResultStore, setSearchResultStore] = useState<SearchResultStoreType[]>([
    { searchTerm: '', resultList: [] },
  ]);

  function addSearchResultStore(resultList: ResultsType[], searchTerm: string) {
    setSearchResultStore(prev => [...prev, { searchTerm, resultList }]);
  }

  function deleteSearchResultStore() {
    const timer = setTimeout(() => {
      let copySearchResultStore = [...searchResultStore];
      copySearchResultStore.shift();
      setSearchResultStore([...copySearchResultStore]);
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }
  return { searchResultStore, addSearchResultStore, deleteSearchResultStore };
}
```
구현방법
- API 호출 시 useState 를 이용한 CacheState를 확인하여 캐싱된 데이터가 있다면 API 호출을 하지 않고 캐싱된 데이터를 사용하도록 구현했습니다.

- 캐시된 데이터의 expire는 setTimeOut을 이용해 1분마다 가장 처음으로 캐싱된 데이터가 지워지게 구현했습니다. 

<br />

### 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현
```tsx
/* SearchSection.tsx */

<input
    id="searchInput"
    type="text"
    value={searchInput}
    onChange={handledSearchInput}
    onClick={() => setIsVisibleSearchResults(true)}
   👉 onKeyDown={event => changeIndexNumber(event, searchResults, searchInput)} 👈
    placeholder="질환명을 입력해주세요."
/>    

/* useMakeFocusIndex.ts */
export default function useMakeFocusIndex() {
  const [focusIndexNumber, setFocusIndexNumber] = useState(-1);

  function changeIndexNumber(
    event: React.KeyboardEvent<HTMLInputElement>,
    searchResults: ResultsType[],
    searchInput: string
  ) {
    if (event.key === 'ArrowDown') {
      searchResults.length > 0 && searchResults.length < 7
        ? setFocusIndexNumber(prev => (prev + 1) % searchResults.length)
        : setFocusIndexNumber(prev => (prev + 1) % 7);
    }
    if (event.key === 'ArrowUp') {
      searchResults.length > 0 && searchResults.length < 7
        ? setFocusIndexNumber(prev => (prev - 1 + searchResults.length) % searchResults.length)
        : setFocusIndexNumber(prev => (prev - 1 + 7) % 7);
    }
    if (event.key === 'Backspace' || searchInput === '') {
      setFocusIndexNumber(-1);
    }
  }

  return { focusIndexNumber, changeIndexNumber };
}

/* SearchResults.tsx */
(...)

  // API통신을 통해 받아온 검색어 표시부분
  {searchResults.map((result, index) => {
    if (index < 7)
      return (
        <Style.SearchTerm key={result.id} focus={focusIndex === index}>
          <span>
            {result.name.slice(result.name.search(searchInput), searchInput.length)}
          </span>
          {result.name.slice(searchInput.length)}
        </Style.SearchTerm>
      );
  })}

(...)
```
구현 방법 

- 검색어를 입력할 수 있는 Input 태그에 **onKeyDown** 이벤트를 이용해서 indexNumber를 변경해주었습니다.여기서 indexNumber는 검색어 결과 목록의 index를 비교해줄 수 있는 변수입니다.

- indexNumber state와 그 state를 변경해주는 changeIndexNumber 함수를 custom hook으로 제작했습니다.

- indexNumber state를 변경해주는 changeIndexNumber 함수는 **누르는 키('ArrowDown', 'ArrowUp', 'Backspace' )에 따라 indexNumber 를 변경**해줍니다.

- 함수를 통해 바뀐 indexNumber는 검색어 목록의 index와 비교하여 같으면 styled-component의 props으로 focus가 전달돼 background-color가 변하게 됩니다.

<br/>

## 폴더 구조

```
📦src
 ┣ 📂apis
 ┃ ┗ 📜searchApis.ts
 ┣ 📂components
 ┃ ┣ 📜RecentSearchTerms.tsx
 ┃ ┣ 📜SearchResults.tsx
 ┃ ┗ 📜SearchSection.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useCache.ts
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useMakeFocusIndex.ts
 ┃ ┗ 📜useSearchInput.ts
 ┣ 📂pages
 ┃ ┗ 📜Main.tsx
 ┣ 📂types
 ┃ ┗ 📜searchTypes.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜setupProxy.js
```



<br />

## 🔨 사용 기술
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">

<br />

## 🔒 코드 컨벤션
### commit message

| 커밋명 | 내용 |
| :---: | :--- |
| feat | 파일, 폴더, 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 형식, 정렬, 주석 등의 변경 |
| refactor | 코드 리팩토링 |
| test | 테스트 코드 추가 |
| comment | 파일을 삭제만 한 경우 |
| chore | 환경설정, 빌드 업무, 패키지 매니저 설정 등 |
| hotfix | 치명적이거나 급한 버그 수정 |


