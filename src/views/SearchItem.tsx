import { BoldText, StyledDiv, StyledLi } from './SearchedList';
import { SmallSearchIcon } from '../assets/SearchSVG';

interface SearchItemProps {
  searchQuery: string;
}

const SearchItem = ({ searchQuery }: SearchItemProps) => {
  return (
    <StyledDiv>
      <SmallSearchIcon />
      <StyledLi>
        <BoldText>{searchQuery}</BoldText>
      </StyledLi>
    </StyledDiv>
  );
};

export default SearchItem;
