import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import SearchedList from './views/SearchedList';
import { MAX_SEARCHED_RESULT_NUM } from './utils/constants';
import useSearch from './hooks/useSearch';

export interface SearchedResponseItem {
  id: number;
  name: string;
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const { searchedResponse, isSearching, handleSearch, getSearchData } = useSearch({
    searchQuery,
    debounceDelay: 300,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedItemIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedItemIndex(prevIndex =>
        Math.min(prevIndex + 1, searchedResponse.length - 1, MAX_SEARCHED_RESULT_NUM - 1)
      );
    }
    if (e.key === 'Enter' && selectedItemIndex >= 0) {
      e.preventDefault();
      const selectedItem = searchedResponse[selectedItemIndex];
      if (selectedItem) {
        setSearchQuery(selectedItem.name);
        handleSearch(selectedItem.name);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedItemIndex(-1);
  };

  return (
    <Layout>
      <Wrapper>
        인턴십 7팀 이지윤
        <StyledH2>
          <br />
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </StyledH2>
        <SearchBar
          handleChange={handleChange}
          searchQuery={searchQuery}
          getSearchData={getSearchData}
          isFocused={isFocused}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {isFocused && (
          <SearchedList
            searchedResponse={searchedResponse}
            searchQuery={searchQuery}
            isSearching={isSearching}
            selectedItemIndex={selectedItemIndex}
          />
        )}
      </Wrapper>
    </Layout>
  );
};

const StyledH2 = styled.h2`
  font-size: 2.5rem;
  font-weight: bolder;
  text-align: center;
  line-height: 60px;
  padding-bottom: 30px;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = styled.div`
  position: relative;
  background-color: #cae9ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1000px;
`;

export default App;
