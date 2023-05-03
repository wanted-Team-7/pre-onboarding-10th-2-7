import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { getSearchResults } from '../apis/searchApis';
import { ResultsType } from '../types/searchTypes';
import useSearchInput from '../hooks/useSearchInput';
import useSearchStore from '../hooks/useSearchStore';

export default function SearchSection() {
  const { searchInput, handledSearchInput } = useSearchInput();
  const { searchResultStore, addSearchResultStore, deleteSearchResult } = useSearchStore();
  const [searchResults, setSearchResults] = useState<ResultsType[]>([]);

  const searchTerm = useDebounce(searchInput, 500);

  async function onSearchData() {
    const response = await getSearchResults(searchTerm);
    setSearchResults(response);
    addSearchResultStore(response, searchTerm);
  }

  useEffect(deleteSearchResult, [searchResultStore]);

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
    <div>
      <input type="text" value={searchInput} onChange={handledSearchInput} />
      <button>검색</button>
      {searchResults &&
        searchResults.map((result, index) => {
          if (index < 7) return <div key={result.id}>{result.name}</div>;
        })}
    </div>
  );
}
