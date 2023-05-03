import SearchResultList from './SearchResultList';
import { SearchResultArea } from '../style/SearchResult.styled';
import { SearchResults } from '../types/result';

const SearchResult = ({ searchResult }: { searchResult: SearchResults[] }) => {
  return (
    <SearchResultArea>
      <span>추천 검색어</span>
      {searchResult &&
        searchResult.map(result => {
          return <SearchResultList key={result.id} result={result} />;
        })}
    </SearchResultArea>
  );
};

export default SearchResult;
