import React, { useEffect, useState } from 'react';
import API from './API/API';
import useDebounce from './hooks/useDebounce';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import SearchedList from './views/SearchedList';
import useExpirationCache from './hooks/useExpirationCache';
import { ONE_HOUR } from './utils/constants';

export interface SearchedResponseItem {
  id: number;
  name: string;
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchedResponse, setSearchedResponse] = useState<SearchedResponseItem[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const { addItem, getItem } = useExpirationCache();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const checkCacheAndSetResponse = (searchQuery: string) => {
    const cachedValue = getItem(searchQuery);

    if (cachedValue) {
      setSearchedResponse(cachedValue);
      setIsSearching(false);
      return true;
    }
    return false;
  };

  const handleSearch = async (searchQuery: string) => {
    const isCached = checkCacheAndSetResponse(searchQuery);

    if (!isCached) {
      setIsSearching(true);
      const response = await API.search({ name: searchQuery });
      setSearchedResponse(response.data);
      setIsSearching(false);
      addItem(searchQuery, response.data, ONE_HOUR);
    }
  };

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSearch(searchQuery);
    // 이전 검색어 배열 가져오기
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

    // 새로운 검색어를 배열에 추가
    recentSearches.push(searchQuery);

    // 최근 검색어 배열을 localstorage에 저장
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    addItem(searchQuery, searchedResponse, ONE_HOUR);
  };

  useEffect(() => {
    const isNotEmpty = debouncedSearchTerm.trim() !== '';

    isNotEmpty && handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Layout>
      <Wrapper>
        <StyledH2>
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
        />
        {isFocused && (
          <SearchedList
            searchedResponse={searchedResponse}
            searchQuery={searchQuery}
            isSearching={isSearching}
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
