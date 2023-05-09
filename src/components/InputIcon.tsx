import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';

interface IInputIconProps {
  isFocused: boolean;
  onClickDeleteBtn: () => void;
}

function InputIcon({ isFocused, onClickDeleteBtn }: IInputIconProps) {
  return (
    <IconWrapper>
      <SearchIconButton>
        <SearchIcon width={16} height={16} color="white" />
      </SearchIconButton>
    </IconWrapper>
  );
}

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0074cc;
  border: 0;

  width: 34px;
  height: 34px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export default InputIcon;
