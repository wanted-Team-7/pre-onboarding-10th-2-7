import styled from 'styled-components';
import { SearchedResponseItem } from '../App';
import RecentSearches from './RecentSearches';
import RecommendedSearches from './RecommendedSearches';
import SearchItem from './SearchItem';

interface SearchedListProps {
  searchedResponse: SearchedResponseItem[];
  searchQuery: string;
  isSearching: boolean;
  selectedItemIndex: number;
}

const SearchedList = ({
  searchedResponse,
  searchQuery,
  isSearching,
  selectedItemIndex,
}: SearchedListProps) => {
  const isSearchEmpty = searchQuery.trim() === '';
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  return (
    <StyledLayout>
      <StyledUl>
        {isSearchEmpty ? (
          <RecentSearches searchQuery={searchQuery} recentSearches={recentSearches} />
        ) : (
          <>
            <SearchItem searchQuery={searchQuery} />
            <RecommendedSearches
              searchQuery={searchQuery}
              isSearching={isSearching}
              searchedResponse={searchedResponse}
              selectedItemIndex={selectedItemIndex}
            />
          </>
        )}
      </StyledUl>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 24px;
  margin: 10px;
`;

const StyledUl = styled.ul`
  padding: 30px 0;
  overflow: hidden;
`;

export const StyledText = styled.div`
  font-size: 14px;
  margin: 10px 30px;
`;

export const StyledDiv = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 30px;
  cursor: pointer;
  background-color: ${({ isSelected }) => isSelected && '#f6f6f6'};
  &:hover {
    background-color: #f6f6f6;
  }
`;

export const StyledLi = styled.li`
  margin: 18px;
`;

export const BoldText = styled.span`
  font-weight: bold;
  color: #e42828;
`;
export default SearchedList;
