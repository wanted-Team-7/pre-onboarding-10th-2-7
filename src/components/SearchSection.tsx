import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { getSearchResults } from '../apis/searchApis';
import { ResultsType, SearchResultStoreType } from '../types/searchTypes';

export default function SearchSection() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<ResultsType[]>([]);
  const [searchResultStore, setSearchResultStore] = useState<SearchResultStoreType[]>([
    { searchTerm: '', resultList: [] },
  ]);

  const searchTerm = useDebounce(searchInput, 500);

  function handledSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.currentTarget.value);
  }

  function addSearchResultStore(resultList: ResultsType[], searchTerm: string) {
    setSearchResultStore(prev => [...prev, { searchTerm, resultList }]);
  }

  async function onSearchData() {
    const response = await getSearchResults(searchTerm);
    setSearchResults(response);
    addSearchResultStore(response, searchTerm);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      let copySearchResultStore = [...searchResultStore];
      copySearchResultStore.shift();
      setSearchResultStore([...copySearchResultStore]);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchResultStore]);

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
