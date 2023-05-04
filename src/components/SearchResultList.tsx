import { SearchList } from '../style/SearchResultList.styled';
import { SearchResults } from '../types/result';

interface SearchResultListType {
  result: SearchResults;
  isFocus: boolean;
}

const SearchResultList = ({ result, isFocus }: SearchResultListType) => {
  return (
    <SearchList isFocus={isFocus}>
      <svg
        viewBox="0 0 16 16"
        fill="#000000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
      </svg>
      <span>{result.name}</span>
    </SearchList>
  );
};

export default SearchResultList;
