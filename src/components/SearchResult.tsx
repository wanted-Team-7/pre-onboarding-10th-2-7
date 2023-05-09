import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';

interface ISearchResult {
  index: number;
  elIndexFocused: number;
  name: string;
  searchKeywordLength: number;
  setElIndexFocused: Dispatch<SetStateAction<number>>;
}

function SearchResult({
  index,
  setElIndexFocused,
  elIndexFocused,
  name,
  searchKeywordLength,
}: ISearchResult) {
  const liMouseOverHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const { index } = e.currentTarget.dataset;
    if (index === undefined) return;
    if (+index === elIndexFocused) return;
    setElIndexFocused(+index);
  };

  return (
    <Li onMouseOver={liMouseOverHandler} data-index={index} isFocus={[index, elIndexFocused]}>
      <SearchIcon width={16} height={16} color="rgba(0, 0, 0, 0.5)" />
      <strong>{name.slice(0, searchKeywordLength)}</strong>
      <span>{name.slice(searchKeywordLength)}</span>
    </Li>
  );
}
const Li = styled.li<{ isFocus: [number, number] }>`
  width: 100%;
  display: flex;
  padding: 10px;
  cursor: pointer;

  background-color: ${props => (props.isFocus[0] === props.isFocus[1] ? '#90cdf4' : 'inherit')};

  strong {
    font-weight: bold;
    margin-left: 6px;
  }
`;
export default SearchResult;
