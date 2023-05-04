import { SearchedResponseItem } from '../App';
import { MAX_SEARCHED_RESULT_NUM } from '../utils/constants';
import SearchedItem from './SearchedItem';
import { StyledText } from './SearchedList';

interface RecommendedSearchesProps {
  searchQuery: string;
  isSearching: boolean;
  searchedResponse: SearchedResponseItem[];
  selectedItemIndex: number;
}

const RecommendedSearches = ({
  searchQuery,
  isSearching,
  searchedResponse,
  selectedItemIndex,
}: RecommendedSearchesProps) => {
  const hasSearchedResponse = searchedResponse.length;

  return (
    <>
      <StyledText>추천 검색어</StyledText>
      {isSearching && <StyledText>검색중 ...</StyledText>}

      {!isSearching && (
        <>
          {hasSearchedResponse ? (
            searchedResponse
              .slice(0, MAX_SEARCHED_RESULT_NUM)
              .map((item: SearchedResponseItem, index: number) => (
                <SearchedItem
                  key={index}
                  id={index}
                  name={item.name}
                  searchQuery={searchQuery}
                  isSelected={index === selectedItemIndex}
                />
              ))
          ) : (
            <StyledText>검색 결과가 없습니다.</StyledText>
          )}
        </>
      )}
    </>
  );
};

export default RecommendedSearches;
