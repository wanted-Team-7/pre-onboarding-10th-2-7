import React from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';
import { useState } from 'react';
import SearchResult from './components/SearchResult';
import SearchIcon from '../assets/search_icon.svg';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elIndexFocused, setElIndexFocused] = useState(-1);

  const formSumbitHandler = (e: React.FormEvent<HTMLFormElement>) => {};
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const inputOnFocusHandler = () => {};
  const inputOnBlurHandler = () => {};
  const inputOnKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  const liMouseOverHandler = (e: React.MouseEvent<HTMLLIElement>) => {};

  return (
    <Main>
      <Title>원티드 프리온보딩 프론트엔드 인턴십(4월) 2주차 기업과제</Title>

      <SearchForm />

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
