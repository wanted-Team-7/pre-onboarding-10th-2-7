import React, { useState, useEffect } from 'react';
import API from '../API/API';
import useDebounce from './useDebounce';
import useExpirationCache from './useExpirationCache';
import { SearchedResponseItem } from '../App';
import { ONE_HOUR } from '../utils/constants';

interface UseSearchProps {
  searchQuery: string;
  debounceDelay: number;
}

const useSearch = ({ searchQuery, debounceDelay }: UseSearchProps) => {
  const [searchedResponse, setSearchedResponse] = useState<SearchedResponseItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchQuery, debounceDelay);
  const { addItem, getItem } = useExpirationCache();

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
    if (searchQuery.trim() !== '') {
      const isCached = checkCacheAndSetResponse(searchQuery);

      if (!isCached) {
        setIsSearching(true);
        const response = await API.search({ name: searchQuery });
        setSearchedResponse(response.data);
        setIsSearching(false);
        addItem(searchQuery, response.data, ONE_HOUR);
      }
    }
  };

  const getSearchData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await handleSearch(searchQuery);

    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recentSearches.push(searchQuery);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

    addItem(searchQuery, searchedResponse, ONE_HOUR);
  };

  useEffect(() => {
    const isNotEmpty = debouncedSearchTerm.trim() !== '';

    isNotEmpty && handleSearch(debouncedSearchTerm);
    // FIXME
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return {
    searchedResponse,
    isSearching,
    handleSearch,
    getSearchData,
  };
};

export default useSearch;
