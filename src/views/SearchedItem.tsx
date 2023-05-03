import { SearchedResponseItem } from '../App';
import { SmallSearchIcon } from '../assets/SearchSVG';
import { BoldText, StyledDiv, StyledLi } from './SearchedList';

interface SearchedItemProps extends SearchedResponseItem {
  searchQuery: string;
}

const SearchedItem = ({ id, name, searchQuery }: SearchedItemProps) => {
  return (
    <StyledDiv key={id}>
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
