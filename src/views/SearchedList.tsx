/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import SearchedItem from './SearchedItem';
import { SmallSearchIcon } from '../assets/SearchSVG';
import { SearchedResponseItem } from '../App';

interface SearchedListProps {
  searchedResponse: SearchedResponseItem[];
  searchQuery: string;
  isSearching: boolean;
}

const SearchedList = ({ searchedResponse, searchQuery, isSearching }: SearchedListProps) => {
  const isSearchEmpty = searchQuery.trim() === '';
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  return (
    <StyledLayout>
      <StyledUl>
        {isSearchEmpty ? (
          <>
            <StyledText>최근 검색어</StyledText>
            {recentSearches.slice(0, 7).map((item: string, index: number) => (
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
                {searchedResponse.length ? (
                  searchedResponse
                    .slice(0, 7)
                    .map((item: SearchedResponseItem) => (
                      <SearchedItem key={item.id} {...item} searchQuery={searchQuery} />
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

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 30px;
  cursor: pointer;
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
