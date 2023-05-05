# 박정도

<br />


## ▪️ 과제
- 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

<br />

## ▪️ 주요 기능 설명 
<br>

### ▫️ **질환명 검색시 API 호출 통해서 검색어 추천 기능 & Localstorage 캐싱**


```ts
// API 호출 및 캐싱
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
<br>

- LocalStorage를 선택한 이유
  - 5MB의 저장 공간
  - JSON object 형태 데이터 저장 가능
  - '추천 검색어' 데이터는 보안의 필요성이 낮기 떄문에
  - 데이터 영구 보관 ( cache expire 로직 따로 구현 )

<br>

- 로직 설명
  - API 호출하기 전, LocalStorage에 해당 검색어가 있는지 확인합니다. <br>
  **<U>해당 검색어가 존재하는 경우</U>** API 호출 없이 데이터를 return 합니다. <br>
  **<U>해당 검색어가 존재하지 않는 경우</U>** API 호출을 진행하고 LocalStorage에 API 결과값 데이터와 expireTime을 객체 형태로 저장하며 API 결과값 데이터를 반환합니다.

<br>

```ts
// cache expire time
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

- 로직 설명 
  - setInterval을 사용하여 일정 주기를 통해 Localstorage에 있는 데이터들의 만료 시간을 확인합니다. 만료 시간이 지난 데이터는 삭제됩니다.

<br>

### ▫️ **useDebounce hook**

```ts
import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

```

- 구현 이유 
  - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행하기 위해

<br>

- 로직 설명 
  - 입력값(인자 value)과 원하는 지연 시간(인자 delay)을 인자로 받아옵니다. <br>
  인자로 받아온 지연 시간을 setTimeout에 설정을 하고 
  delay 시간 안에 다른 이벤트가 발생하지 않는다면 setDebounceValue가 실행되어 바뀐 값이 return 되고 다른 이벤트가 발생하면 기존 값이 그대로 return 됩니다



## ▪️ 폴더 구조
```
📦src
 ┣ 📂api
 ┃ ┗ 📜client.ts
 ┣ 📂assets
 ┃ ┣ 📜magnifier.svg
 ┃ ┗ 📜delete.svg
 ┣ 📂components
 ┃ ┣ 📂inputBox
 ┃ ┃  ┣ 📜inputBox.tsx
 ┃ ┃  ┗ 📜inputBox.styled.ts
 ┃ ┗ 📂searchBox
 ┃    ┣ 📜searchBox.tsx
 ┃    ┗ 📜searchBox.styled.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useDebounce.tsx 
 ┣ 📂utils
 ┃ ┗ expireCache.ts
 ┣ 📂page
 ┃ ┣ 📜main.tsx
 ┃ ┣ 📜main.styled.tsx
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜constants.ts
 ┣ 📜custom.d.ts
 ┣ 📜type.ts
 ┗ 📜setupProxy.js
 ```