# 1차 기업 과제 - 7팀 김희진

## 1. 폴더 구조
```
📦src
 ┣ 📂api
 ┃ ┗ 📜baseApi.ts
 ┣ 📂components
 ┃ ┣ 📜SearchInput.tsx
 ┃ ┣ 📜SearchResult.tsx
 ┃ ┗ 📜SearchResultList.tsx
 ┣ 📂style
 ┃ ┣ 📜SearchInput.styled.ts
 ┃ ┣ 📜SearchResult.styled.ts
 ┃ ┗ 📜SearchResultList.styled.ts
 ┣ 📂types
 ┃ ┗ 📜result.d.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜setupProxy.js
```
## 2. 기능
<br />

> ### 1️⃣ 검색 기능


```tsx
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchResult(searchWord).then(result => setSearchResult(result));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchWord]);
```
- 검색 시, 단어를 입력할 때마다 api 요청을 보내지 않기 위해 디바운싱을 사용하여
0.5초에 한 번 api 요청을 보내도록 했습니다.
- 디바운싱을 구현하기 위해 따로 hook을 만들지는 않았습니다. 
- 하지만 디바운싱을 여러 곳에서 사용할 필요가 있어 확장성을 고려해야 한다면 hook을 만드는 것도 좋은 방법이라고 생각합니다.
- 이번 프로젝트의 경우 원 페이지, 검색 창 구현만 진행했기 때문에 굳이 hook으로 빼지 않았습니다.

<br />

> ### 3️⃣ 로컬 캐시 기능

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
- api를 요청하는 로직 안에서 웹 캐시, 캐시 스토리지를 이용해 캐싱 기능을 구현했습니다.
- 호출된 url 주소의 응답을 캐시 스토리지에 저장합니다.
- 같은 단어를 검색하는 경우 캐시 스토리지에 같은 url로 검색된 응답이 있는지 캐시의 ```match``` 메소드를 사용하여 먼저 체크합니다.
- 같은 응답이 존재한다면 캐시 스토리지에서 응답을 가져와서 리턴해주고 따로 api 요청을 하지 않습니다.

<br />

> ### 4️⃣ 키보드 방향키로 리스트 이동 기능

```tsx
const [focusIndex, setFocusIndex] = useState<number>(-1);
const focusRef = useRef<HTMLOListElement>(null);

 const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex(prevIndex => (prevIndex <= 0 ? searchResult.length - 1 : prevIndex - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex(prevIndex => (prevIndex >= searchResult.length - 1 ? 0 : prevIndex + 1));
        break;
      case 'Enter':
        break;
      default:
        break;
    }
  };
```
- keydownHandler 이벤트는 검색 인풋 창에서 키보드 방향키를 조작할 때 실행됩니다.
- 방향키를 누르면 focusIndex 초기 state값을 기준으로 검색된 결과 리스트 내에서 
- focusIndex 값과 검색 결과 리스트에 부여한 index 값을 비교하여 일치하는 경우 focusing 된 검색 결과 리스트에 배경 컬러 변경이 적용되도록 했습니다.
