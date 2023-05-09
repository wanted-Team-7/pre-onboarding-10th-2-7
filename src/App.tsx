import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import SearchResultKeyword from './components/SearchResultKeyword';
import useSearchQuery from './hooks/useSearchQuery';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [elIndexFocused, setElIndexFocused] = useState(-1);

  const { searchData, isLoading, setIsLoading } = useSearchQuery(searchKeyword);
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
    setIsLoading(true);
    setElIndexFocused(-1);
  };
  const inputOnFocusHandler = () => {
    setIsInputFocused(true);
  };

  const handleArrowUpKey = () => {
    if (elIndexFocused <= 0) {
      setElIndexFocused(searchData.length - 1);
    } else {
      setElIndexFocused(prev => prev - 1);
    }
  };
  const handleArrowDownKey = () => {
    if (elIndexFocused === searchData.length - 1) {
      setElIndexFocused(0);
    } else {
      setElIndexFocused(prev => prev + 1);
    }
  };
  const handleEscapeKey = () => {
    setSearchKeyword('');
    setElIndexFocused(-1);
  };
  const inputOnKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const functionFor: { [key: string]: () => void } = {
      ArrowUp: handleArrowUpKey,
      ArrowDown: handleArrowDownKey,
      Escape: handleEscapeKey,
    };

    if (event.nativeEvent.isComposing) return;
    if (searchData.length === 0 || !Object.keys(functionFor).includes(event.key)) return;
    event.preventDefault();

    return functionFor[event.key]();
  };

  return (
    <Main>
      <Title>2주차 기업과제 7팀</Title>

      <SearchForm
        value={searchKeyword}
        onChange={inputOnChangeHandler}
        onFocus={inputOnFocusHandler}
        onKeyDown={inputOnKeyDownHandler}
        isFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        setElIndexFocused={setElIndexFocused}
        setSearchKeyword={setSearchKeyword}
      />

      {isInputFocused && (
        <SearchResultsWrapper>
          <ul>
            {isLoading ? (
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
                  elIndexFocused={elIndexFocused}
                  setElIndexFocused={setElIndexFocused}
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
