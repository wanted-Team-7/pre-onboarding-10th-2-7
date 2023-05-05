## 폴더 구조
```
📂 src
├──📂 api
│   ├── 📄 axiosInstance
│   └── 📄 getServerData
├──📂 components
│   ├── 📄 DropdownList
│   ├── 📄 SearchInput
│   └── 📄 Title
├──📂 hooks
│   └── 📄 useDebounce
├──📂 Icons
│   ├── 📄 DropdownListIcon
│   └── 📄 SearchButtonIcon
├──📂 pages
│   └── 📄 SearchPage
├──📂 types
│   └── 📄 types
└──📂 utils
    └── 📄 cacheStorage
```
## 검색 시 API 호출별로 로컬 캐싱 구현
- API 호출 시 localStorage를 확인해 캐싱된 데이터가 있다면 API 호출을 하지 않고 localStorage의 캐싱된 데이터를 사용하도록 구현했습니다.
```tsx
export const getServerData = async (params: Record<string, string>, { isCached = false }) => {
  const paramsData = new URLSearchParams(params).toString();

  const addParams = `?${paramsData}`;

  if (isCached && cacheStorage.getServerData(decodeURI(addParams)) !== null) {
    return cacheStorage.getServerData(decodeURI(addParams));
  }

  const { data } = await fetchData(addParams);

  if (isCached) {
    cacheStorage.setStorageItem(decodeURI(addParams), data);
  }
  return data;
};
```
## 검색어 입력마다 API 호출하지 않도록 API 호출 횟수 줄이기
- `useDebounce` custom hook을 사용해 `onChange` 이벤트 발생 시점으로부터 의도적인 지연시간을 두어 API 호출 횟수를 줄였습니다.
- 검색창의 `onChange` 이벤트가 input의 상태값을 업데이트하되, input의 상태값은 디바운싱을 통해 설정한 시간(200ms)이 지난 뒤 최종적으로 업데이트된 상태값을 호출하도록 구현했습니다.
```tsx
import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
}
```
```tsx
// SearchPage.ts
 const debouncedSearchText = useDebounce(inputValue, 200);
 
 serverData = await getServerData({ name: debouncedSearchText }, { isCached: true });
```
## 키보드만으로 추천 검색어들로 이동 가능하도록 구현
- input에서 `onKeyDown` 이벤트 발생 시 `event.key` 값이 `ArrowDown`, `ArrowUp`일 경우 선택된 index의 상태값(`selectedIndex`)이 변경되게 구현했습니다
  - 데이터 리스트의 마지막 요소에서 `ArrowDown`을 시도할 경우 index 상태값을 초기화하였습니다.
  - 데이터 리스트의 처음 요소에서 `ArrowUp`을 시도할 경우 index 상태값을 데이터 리스트의 마지막 요소로 설정하였습니다.
- 선택된 index의 상태값(`selectedIndex`)과 데이터 리스트의 index값이 같을 경우 `selected` className을 추가하여 `background-color`를 변경했습니다.
```tsx
const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '') return;

    const lastIndex = serverDataList.length - 1;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex === -1 ? setSelectedIndex(lastIndex) : setSelectedIndex(selectedIndex - 1);
        break;
      case 'ArrowDown':
        selectedIndex === lastIndex ? setSelectedIndex(0) : setSelectedIndex(selectedIndex + 1);
        break;
      default:
        break;
    }
  };
```
```tsx
export default function DropdownList({ keyword, selectedIndex, dataIndex }: DropdownListProps) {
  return (
    <KeywordContainer className={dataIndex === selectedIndex ? 'selected' : ''}>
      <DropdownListIcon />
      {keyword}
    </KeywordContainer>
  );
}
```
## 검색어 없을 경우 검색어 없음 표출
- 검색된 문자열이 없을 경우 검색어 없음을 구현했습니다.
- 가독성을 고려하여 조건 로직을 변수로 분리했습니다.
```tsx
const isNoData = serverDataList.length === 0;

{isNoData && <li id="noDataLabel">추천 검색어 없음</li>}
```
