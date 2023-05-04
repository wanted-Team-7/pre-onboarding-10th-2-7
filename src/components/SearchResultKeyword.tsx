import { ReactNode } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';

interface ISearchResultKeywordProps {
  children: ReactNode;
}

function SearchResultKeyword({ children }: ISearchResultKeywordProps) {
  return (
    <Li>
      <SearchIcon width={16} height={16} color="rgba(0, 0, 0, 0.5)" />
      <strong>{children}</strong>
    </Li>
  );
}
const Li = styled.li`
  width: 100%;
  display: flex;
  padding: 8px;
  cursor: default;
  strong {
    font-weight: bold;
    margin-left: 6px;
  }
`;

export default SearchResultKeyword;
