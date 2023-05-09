import { useEffect, useState } from 'react';
import { ISearchData, getSearchData } from '../apis/searchApi';
import { DEBOUNCE_TIMEOUT_SEC } from '../constants/constant';

export function useSearchQuery(searchKeyword: string) {
  const [searchData, setSearchData] = useState<ISearchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      try {
        const data = await getSearchData(searchKeyword);
        setSearchData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch error! ', error);
      }
    }, DEBOUNCE_TIMEOUT_SEC * 1000);
    return () => clearTimeout(debounceTimeout);
  }, [searchKeyword]);

  return { searchData, isLoading, setIsLoading };
}

export default useSearchQuery;
