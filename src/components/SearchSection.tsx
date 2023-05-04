import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { getSearchResults } from '../apis/searchApis';
import { ResultsType } from '../types/searchTypes';
import useSearchInput from '../hooks/useSearchInput';
import useSearchStore from '../hooks/useSearchStore';
import SearchResults from './SearchResults';
import styled from 'styled-components';

type SearchSectionType = {
  isVisibleSearchResults: boolean;
  setIsVisibleSearchResults: (isVisibleSearchResults: boolean) => void;
};
export default function SearchSection({
  isVisibleSearchResults,
  setIsVisibleSearchResults,
}: SearchSectionType) {
  const { searchInput, handledSearchInput } = useSearchInput();
  const { searchResultStore, addSearchResultStore, deleteSearchResult } = useSearchStore();
  const [searchResults, setSearchResults] = useState<ResultsType[]>([]);

  const searchTerm = useDebounce(searchInput, 500);

  useEffect(deleteSearchResult, [searchResultStore]);

  async function onSearchData() {
    const response = await getSearchResults(searchTerm);
    setSearchResults(response);
    addSearchResultStore(response, searchTerm);
  }

  useEffect(() => {
    if (searchTerm !== '') {
      const storeSearchList = searchResultStore.find(
        searchItem => searchItem.searchTerm === searchTerm
      )?.resultList;

      if (storeSearchList) {
        setSearchResults(storeSearchList);
      } else onSearchData();
    } else setSearchResults([{ name: '데이터 없음', id: 0 }]);
  }, [searchTerm]);

  return (
    <Style.Container>
      <Style.SearchBar isVisibleSearchResults={isVisibleSearchResults}>
        <Style.InputContainer>
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
          </svg>
          <input
            id="searchInput"
            type="text"
            value={searchInput}
            onChange={handledSearchInput}
            onClick={() => setIsVisibleSearchResults(true)}
            placeholder="질환명을 입력해주세요."
          />
        </Style.InputContainer>
        <Style.SearchButton type="button">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
          </svg>
        </Style.SearchButton>
      </Style.SearchBar>
      {isVisibleSearchResults && <SearchResults searchResults={searchResults} />}
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    width: 490px;
    margin: 0 auto;
  `,
  SearchBar: styled.div<{ isVisibleSearchResults: boolean }>`
    border-radius: 42px;
    border: 2px solid;
    border-color: ${({ isVisibleSearchResults }) =>
      isVisibleSearchResults ? '#007be9' : '#ffffff'};
    background-color: #ffffff;
    flex-direction: row;
    align-items: center;
    display: flex;
    max-width: 490px;
    padding-right: 8px;
  `,

  InputContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    padding: 20px 10px 20px 24px;
    color: #a7afb7;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 12px;
    }

    input {
      ::placeholder {
        color: #a7afb7;
      }
      :focus {
        outline: none;
      }
      width: 100%;
      border: 0;
      background-color: transparent;
      flex: 1;
      font-size: 1.125rem;
      font-weight: 400;
      line-height: 1.6;
    }
  `,

  SearchButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 100%;
    background-color: #007be9;
    color: #ffffff;
    cursor: pointer;
    svg {
      width: 21px;
      height: 21px;
    }
  `,
};
