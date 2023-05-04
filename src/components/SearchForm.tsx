import { useState } from 'react';
import SearchButton from '../utils/SearchButton';
import SearchList from './SearchList';
import * as S from '../styles/searchForm.style';

const SearchForm = () => {
  const [inputText, setInputText] = useState('');
  const [onFocusCheck, setOnFocusCheck] = useState(false);

  const changeBoolean = () => {
    setOnFocusCheck(!onFocusCheck);
  };

  return (
    <S.wrapper>
      <S.container>
        <S.wrapper2>
          <S.searchInput
            placeholder="질환명을 입력해 주세요."
            onFocus={changeBoolean}
            onBlur={changeBoolean}
            onChange={e => setInputText(e.target.value)}
            value={inputText}
          ></S.searchInput>
        </S.wrapper2>
        {onFocusCheck ? <SearchList /> : null}
        <SearchButton />
      </S.container>
    </S.wrapper>
  );
};

export default SearchForm;
