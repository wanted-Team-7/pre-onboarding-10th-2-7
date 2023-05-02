import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { getSearchResults } from '../apis/searchApis';

type ResultsType = {
  name: string;
  id: number;
};

export default function SearchSection() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<ResultsType[]>([]);

  function handledSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.currentTarget.value);
  }

  const SearchTerm = useDebounce(searchInput, 500);

  async function onSearchData() {
    const response = await getSearchResults(SearchTerm);
    setSearchResults(response);
  }

  useEffect(() => {
    onSearchData();
  }, [SearchTerm]);

  return (
    <div>
      <input type="text" value={searchInput} onChange={handledSearchInput} />
      <button>검색</button>
      <div></div>
      {searchResults.map((result, index) => {
        if (index < 7) return <div key={result.id}>{result.name}</div>;
      })}
    </div>
  );
}
