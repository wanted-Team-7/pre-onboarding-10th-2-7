import React, { useRef, useState } from 'react';
import SearchInputComponent from './components/SearchInput';
import SearchResult from './components/SearchResult';
import { SearchResults } from './types/result';

function App() {
  const [searchResult, setSearchResult] = useState<SearchResults[]>([]);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const focusRef = useRef<HTMLOListElement>(null);

  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex(prevIndex => (prevIndex <= 0 ? searchResult.length - 1 : prevIndex - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex(prevIndex => (prevIndex >= searchResult.length - 1 ? 0 : prevIndex + 1));
        break;
      case 'Enter':
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SearchInputComponent setSearchResult={setSearchResult} keydownHandler={keydownHandler} />
      {searchResult.length > 0 ? (
        <SearchResult searchResult={searchResult} focusRef={focusRef} focusIndex={focusIndex} />
      ) : null}
    </>
  );
}

export default App;
