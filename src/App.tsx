import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';
import { useState } from 'react';
import SearchResult from './components/SearchResult';
import SearchIcon from '../assets/search_icon.svg';
import { DEBOUNCE_TIMEOUT_SEC } from './constants/constant';
import { ISearchData, getSearchData } from './apis/searchAPI';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState<ISearchData[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elIndexFocused, setElIndexFocused] = useState(-1);

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
    setIsLoading(true);
    setElIndexFocused(-1);
  };
  const inputOnFocusHandler = () => {
    setIsInputFocused(true);
  };
  const inputOnBlurHandler = () => {
    setIsInputFocused(false);
    setElIndexFocused(-1);
  };
  const inputOnKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  const liMouseOverHandler = (e: React.MouseEvent<HTMLLIElement>) => {};

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
  return (
    <Main>
      <Title>원티드 프리온보딩 프론트엔드 인턴십(4월) 2주차 기업과제</Title>

      <SearchForm
        value={searchKeyword}
        onChange={inputOnChangeHandler}
        onFocus={inputOnFocusHandler}
        onBlur={inputOnBlurHandler}
        onKeyDown={inputOnKeyDownHandler}
        isFocus={isInputFocused}
      />

      {isInputFocused && (
        <SearchResultsWrapper>
          <ul>
            {isLoading && searchData.length === 0 && <SearchResultNone>검색중...</SearchResultNone>}
            {isLoading ||
              (searchKeyword === '' && (
                <SearchResultNone>최근 검색어가 없습니다.</SearchResultNone>
              ))}
            {isLoading ||
              (searchKeyword !== '' && (
                <>
                  <SearchResultKeyword>
                    <SearchIcon width={16} height={16} color="rgba(0, 0, 0, 0.5)" />
                    <strong>{searchKeyword}</strong>
                  </SearchResultKeyword>
                </>
              ))}
            {isLoading || (searchData.length !== 0 && <hr />)}
            {searchData.length !== 0 &&
              searchData.map((el, idx) => (
                <SearchResult
                  key={el.id}
                  index={idx}
                  onMouseOver={liMouseOverHandler}
                  elIndexFocused={elIndexFocused}
                />
              ))}
          </ul>
        </SearchResultsWrapper>
      )}
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 14px;
`;

const SearchResultsWrapper = styled.div`
  font-size: 16px;
  width: 300px;
  min-height: 80px;
  border-radius: 16px;
  border: 1px solid #0074cc;
  padding: 10px;
  margin-top: 6px;

  ul {
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;

const SearchResultNone = styled.li`
  color: rgba(0, 0, 0, 0.5);
  width: 100%;
  margin-left: 6px;
  cursor: default;
`;

const SearchResultKeyword = styled.li`
  width: 100%;
  display: flex;
  padding: 8px;
  cursor: default;
  strong {
    margin-left: 6px;
  }
`;

export default App;
