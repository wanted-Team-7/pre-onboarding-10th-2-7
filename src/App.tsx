import { useState } from 'react';
import SearchInputComponent from './components/SearchInput';
import SearchResult from './components/SearchResult';
import { SearchResults } from './types/result';

function App() {
  const [searchResult, setSearchResult] = useState<SearchResults[]>([]);
  return (
    <>
      <SearchInputComponent setSearchResult={setSearchResult} />
      {searchResult.length > 1 ? <SearchResult searchResult={searchResult} /> : null}
    </>
  );
}

export default App;
