import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';
import useSearchQuery from './hooks/useSearchQuery';
import SearchResults from './components/SearchResults';

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
        <SearchResults
          searchKeyword={searchKeyword}
          isLoading={isLoading}
          searchData={searchData}
          elIndexFocused={elIndexFocused}
          setElIndexFocused={setElIndexFocused}
        />
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

export default App;
