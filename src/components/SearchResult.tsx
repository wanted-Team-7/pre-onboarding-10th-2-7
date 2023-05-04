import React from 'react';
import SearchResultList from './SearchResultList';
import { SearchResultArea } from '../style/SearchResult.styled';
import { SearchResults } from '../types/result';

interface SearchResultType {
  searchResult: SearchResults[];
  focusRef: React.RefObject<HTMLOListElement>;
  focusIndex: number;
}

const SearchResult = ({ searchResult, focusRef, focusIndex }: SearchResultType) => {
  return (
    <SearchResultArea ref={focusRef}>
      <span>추천 검색어</span>
      {searchResult &&
        searchResult.map((result, idx) => {
          return (
            <SearchResultList
              key={result.id}
              result={result}
              isFocus={idx === focusIndex ? true : false}
            />
          );
        })}
    </SearchResultArea>
  );
};

export default SearchResult;
