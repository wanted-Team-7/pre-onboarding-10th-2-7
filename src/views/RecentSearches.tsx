import { MAX_SEARCHED_RESULT_NUM } from '../utils/constants';
import SearchedItem from '../components/SearchedItem';
import { StyledText } from '../components/SearchedList';

interface RecentSearchesProps {
  searchQuery: string;
}

const RecentSearches = ({ searchQuery }: RecentSearchesProps) => {
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  return (
    <>
      <StyledText>최근 검색어</StyledText>
      {recentSearches
        .reverse()
        .slice(0, MAX_SEARCHED_RESULT_NUM)
        .map((item: string, index: number) => (
          <SearchedItem key={index} id={index} name={item} searchQuery={searchQuery} />
        ))}
    </>
  );
};

export default RecentSearches;
