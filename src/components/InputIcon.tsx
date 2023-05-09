import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';
import { ReactComponent as CloseIcon } from '../assets/close_icon.svg';

interface IInputIconProps {
  isFocused: boolean;
  onClickDeleteBtn: () => void;
}

function InputIcon({ isFocused, onClickDeleteBtn }: IInputIconProps) {
  return (
    <IconWrapper>
      {isFocused && (
        <CloseIconButton onClick={onClickDeleteBtn}>
          <CloseIcon width={12} height={12} color="white" />
        </CloseIconButton>
      )}
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

const CloseIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 0;

  margin-right: 4px;
  &:hover {
    cursor: pointer;
  }
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
