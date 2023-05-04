import { MAX_SEARCHED_RESULT_NUM } from '../utils/constants';
import SearchedItem from './SearchedItem';
import { StyledText } from './SearchedList';

interface RecentSearchesProps {
  searchQuery: string;
  recentSearches: string[];
}

const RecentSearches = ({ searchQuery, recentSearches }: RecentSearchesProps) => {
  return (
    <>
      <StyledText>최근 검색어</StyledText>
      {recentSearches.slice(0, MAX_SEARCHED_RESULT_NUM).map((item: string, index: number) => (
        <SearchedItem key={index} id={index} name={item} searchQuery={searchQuery} />
      ))}
    </>
  );
};

export default RecentSearches;
