import { useState } from 'react';
import { ResultsType, SearchResultStoreType } from '../types/searchTypes';

export default function useCache() {
  const [searchResultStore, setSearchResultStore] = useState<SearchResultStoreType[]>([
    { searchTerm: '', resultList: [] },
  ]);

  function addSearchResultStore(resultList: ResultsType[], searchTerm: string) {
    setSearchResultStore(prev => [...prev, { searchTerm, resultList }]);
  }

  function deleteSearchResultStore() {
    const timer = setTimeout(() => {
      let copySearchResultStore = [...searchResultStore];
      copySearchResultStore.shift();
      setSearchResultStore([...copySearchResultStore]);
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }
  return { searchResultStore, addSearchResultStore, deleteSearchResultStore };
}
