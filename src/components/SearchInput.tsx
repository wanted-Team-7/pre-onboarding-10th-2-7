import React, { useEffect, useState } from 'react';
import { getSearchResult } from '../api/baseApi';
import {
  SearchInputArea,
  SearchInput,
  DeleteButton,
  SearchButton,
} from '../style/SearchInput.styled';
import { SetSearchResultFunc } from '../types/result';

interface SearchInputComponentType {
  setSearchResult: SetSearchResultFunc['setSearchResult'];
  keydownHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInputComponent = ({ setSearchResult, keydownHandler }: SearchInputComponentType) => {
  const [searchWord, setSearchWord] = useState<string>('');

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchResult(searchWord).then(result => setSearchResult(result));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchWord]);

  return (
    <SearchInputArea>
      <form>
        <SearchInput
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={searchWord}
          onChange={onChangeInputHandler}
          onKeyDown={keydownHandler}
        />
        <DeleteButton type="button">
          <span>x</span>
        </DeleteButton>
        <SearchButton type="submit">
          <span>검색버튼</span>
          <svg
            viewBox="0 0 16 16"
            fill="#ffffff"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
          </svg>
        </SearchButton>
      </form>
    </SearchInputArea>
  );
};

export default SearchInputComponent;
