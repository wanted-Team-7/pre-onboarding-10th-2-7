import styled from 'styled-components';
import { SmallSearchIcon } from '../assets/SearchSVG';

interface SearchInputPlaceholderProps {
  value: string;
  isFocused: boolean;
}

const SearchInputPlaceholder = ({ value, isFocused }: SearchInputPlaceholderProps) => {
  return (
    <StyledPlaceholder isFocused={isFocused} value={value}>
      <SmallSearchIcon />
      <StyledText>질환명을 입력해 주세요.</StyledText>
    </StyledPlaceholder>
  );
};

const StyledPlaceholder = styled.span<SearchInputPlaceholderProps>`
  position: absolute;
  display: ${props => (props.isFocused || props.value ? 'none' : 'flex')};
  align-items: center;
  font-size: 18px;
`;

const StyledText = styled.span`
  margin: 10px;
  font-size: 16px;
`;

export default SearchInputPlaceholder;
