import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../assets/search_icon.svg';

interface ISearchResult {
  index: number;
  onMouseOver: (e: React.MouseEvent<HTMLLIElement>) => void;
  elIndexFocused: number;
}

function SearchResult({ index, onMouseOver, elIndexFocused }: ISearchResult) {
  return (
    <Li onMouseOver={onMouseOver} data-index={index} isFocus={[index, elIndexFocused]}>
      <SearchIcon width={16} height={16} color="rgba(0, 0, 0, 0.5)" />
    </Li>
  );
}
const Li = styled.li<{ isFocus: [number, number] }>`
  width: 100%;
  display: flex;
  padding: 8px;
  cursor: pointer;

  background-color: ${props => (props.isFocus[0] === props.isFocus[1] ? '#90cdf4' : 'inherit')};

  strong {
    margin-left: 6px;
  }
`;
export default SearchResult;
