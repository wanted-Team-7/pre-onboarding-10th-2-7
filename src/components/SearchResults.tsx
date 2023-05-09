import styled from 'styled-components';
import SearchResultKeyword from './SearchResultKeyword';
import SearchResult from './SearchResult';
import { ISearchData } from '../apis/searchApi';
import { Dispatch, SetStateAction } from 'react';

interface ISearchResults {
  isLoading: boolean;
  searchKeyword: string;
  searchData: ISearchData[];
  elIndexFocused: number;
  setElIndexFocused: Dispatch<SetStateAction<number>>;
}

function SearchResults({
  isLoading,
  searchKeyword,
  searchData,
  elIndexFocused,
  setElIndexFocused,
}: ISearchResults) {
  return (
    <SearchResultsWrapper>
      <ul>
        {isLoading && <SearchResultNone>검색중...</SearchResultNone>}
        {isLoading || <SearchResultKeyword>{searchKeyword}</SearchResultKeyword>}
        {isLoading || (searchData.length === 0 && <SearchResultNone>검색어 없음</SearchResultNone>)}
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
  );
}

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

export default SearchResults;
