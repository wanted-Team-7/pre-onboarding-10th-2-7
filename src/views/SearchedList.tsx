/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import SearchedItem from './SearchedItem';
import { SmallSearchIcon } from '../assets/SearchSVG';
import { SearchedResponseItem } from '../App';
import { MAX_SEARCHED_RESULT_NUM } from '../utils/constants';

interface SearchedListProps {
  searchedResponse: SearchedResponseItem[];
  searchQuery: string;
  isSearching: boolean;
  selectedItemIndex: any;
}

const SearchedList = ({
  searchedResponse,
  searchQuery,
  isSearching,
  selectedItemIndex,
}: SearchedListProps) => {
  const isSearchEmpty = searchQuery.trim() === '';
  const hasSearchedResponse = searchedResponse.length;
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  return (
    <StyledLayout>
      <StyledUl>
        {isSearchEmpty ? (
          <>
            <StyledText>최근 검색어</StyledText>
            {recentSearches.slice(0, MAX_SEARCHED_RESULT_NUM).map((item: string, index: number) => (
              <SearchedItem key={index} id={index} name={item} searchQuery={searchQuery} />
            ))}
          </>
        ) : (
          <>
            <StyledDiv>
              <SmallSearchIcon />
              <StyledLi>
                <BoldText>{searchQuery}</BoldText>
              </StyledLi>
            </StyledDiv>
            <StyledText>추천 검색어</StyledText>
            {isSearching ? (
              <StyledText>검색중 ...</StyledText>
            ) : (
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
        )}
      </StyledUl>
    </StyledLayout>
  );
};

const StyledText = styled.div`
  font-size: 14px;
  margin: 10px 30px;
`;

const StyledLayout = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 24px;
  margin: 10px;
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

const StyledUl = styled.ul`
  padding: 30px 0;
  overflow: hidden;
`;

export const StyledLi = styled.li`
  margin: 18px;
`;
export const BoldText = styled.span`
  font-weight: bold;
  color: #e42828;
`;
export default SearchedList;
