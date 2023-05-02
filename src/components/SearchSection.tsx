import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

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

  useEffect(() => {
    searchItems(SearchTerm);
  }, [SearchTerm]);

  const searchItems = async (SearchTerm: string) => {
    try {
      if (SearchTerm) {
        const response = await axios.get(`api/v1/search-conditions/?name=${SearchTerm}`);
        console.info('calling api');
        setSearchResults(response.data);
      } else setSearchResults([{ name: '데이터 없음', id: 0 }]);
    } catch {
      alert('결과를 불러오는 중 에러가 발생했습니다.');
    }
  };

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
