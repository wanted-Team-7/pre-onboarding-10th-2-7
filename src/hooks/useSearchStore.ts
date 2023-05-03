import { useState } from 'react';
import { ResultsType, SearchResultStoreType } from '../types/searchTypes';

export default function useSearchStore() {
  const [searchResultStore, setSearchResultStore] = useState<SearchResultStoreType[]>([
    { searchTerm: '', resultList: [] },
  ]);

  // TODO: 변수명 변경
  function addSearchResultStore(resultList: ResultsType[], searchTerm: string) {
    setSearchResultStore(prev => [...prev, { searchTerm, resultList }]);
  }

  function deleteSearchResult() {
    const timer = setTimeout(() => {
      let copySearchResultStore = [...searchResultStore];
      copySearchResultStore.shift();
      setSearchResultStore([...copySearchResultStore]);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }
  return { searchResultStore, addSearchResultStore, deleteSearchResult };
}
