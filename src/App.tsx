import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import { DEBOUNCE_TIMEOUT_SEC } from './constants/constant';
import { ISearchData, getSearchData } from './apis/searchApi';
import SearchResultKeyword from './components/SearchResultKeyword';

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
  const liMouseOverHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const { index } = e.currentTarget.dataset;
    if (index === undefined) return;
    if (+index === elIndexFocused) return;
    setElIndexFocused(+index);
  };

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
      <Title>2주차 기업과제 7팀</Title>

      <SearchForm
        value={searchKeyword}
        onChange={inputOnChangeHandler}
        onFocus={inputOnFocusHandler}
        onBlur={inputOnBlurHandler}
        onKeyDown={inputOnKeyDownHandler}
        isFocused={isInputFocused}
      />

      {isInputFocused && (
        <SearchResultsWrapper>
          <ul>
            {isLoading && searchData.length === 0 ? (
              <SearchResultNone>검색중...</SearchResultNone>
            ) : (
              <SearchResultKeyword>{searchKeyword}</SearchResultKeyword>
            )}

            {isLoading ||
              (searchData.length === 0 && <SearchResultNone>검색어 없음</SearchResultNone>)}

            {/* {isLoading || (searchData.length !== 0 && <hr />)} */}
            {isLoading || (searchData.length !== 0 && <p>추천 검색어</p>)}

            {isLoading ||
              searchData.map((el, idx) => (
                <SearchResult
                  key={el.id}
                  name={el.name}
                  index={idx}
                  onMouseOver={liMouseOverHandler}
                  elIndexFocused={elIndexFocused}
                  searchKeywordLength={searchKeyword.length}
                />
              ))}
          </ul>
        </SearchResultsWrapper>
      )}
    </Main>
  );
}

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #cae9ff;

  padding-top: 60px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 14px 0;
  text-align: center;
  letter-spacing: -0.018em;
  line-height: 1.6;
`;

const SearchResultsWrapper = styled.div`
  font-size: 16px;
  width: 300px;
  /* min-height: 40px; */
  border-radius: 16px;
  /* border: 1px solid #0074cc; */
  padding: 10px 0;
  margin-top: 6px;

  background-color: white;

  ul {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  p {
    padding: 5px;
    font-size: 11px;
    color: #5d5d5d;

    letter-spacing: -0.04em;
  }
`;

const SearchResultNone = styled.li`
  color: rgba(0, 0, 0, 0.5);
  width: 100%;
  margin-left: 6px;
  padding: 10px;
  cursor: default;
`;

export default App;
