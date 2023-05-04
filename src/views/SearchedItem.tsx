import { SearchedResponseItem } from '../App';
import { SmallSearchIcon } from '../assets/SearchSVG';
import { BoldText, StyledDiv, StyledLi } from './SearchedList';

interface SearchedItemProps extends SearchedResponseItem {
  searchQuery: string;
  isSelected?: any;
}

const SearchedItem = ({ id, name, searchQuery, isSelected }: SearchedItemProps) => {
  return (
    <StyledDiv key={id} isSelected={isSelected}>
      <SmallSearchIcon />
      <StyledLi>
        {name.includes(searchQuery) ? (
          <>
            <BoldText>{searchQuery}</BoldText>
            {name.slice(searchQuery.length)}
          </>
        ) : (
          name
        )}
      </StyledLi>
    </StyledDiv>
  );
};

export default SearchedItem;
