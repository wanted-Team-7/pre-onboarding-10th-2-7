import styled from 'styled-components';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { SearchButtonIcon } from '../icons/SearchButtonIcon';

export default function SearchInput({
  onChange,
  onClick,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler;
}) {
  return (
    <InputContainer>
      <Input
        type="search"
        placeholder="질환명을 입력해 주세요."
        onChange={onChange}
        onClick={onClick}
      />
      <ButtonContainer>
        <SearchButtonIcon />
      </ButtonContainer>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  max-width: 490px;
  width: 100%;
  display: flex;

  border-radius: 42px;
  border: 2px solid white;
  background-color: white;

  :focus-within {
    border: 2px solid rgb(25, 118, 210);
  }
`;

const Input = styled.input`
  border-radius: 42px;
  border: 2px solid white;
  border: none;
  outline: none;
  width: 90%;
  padding: 20px 48px 20px 50px;

  background-color: white;
  background-image: url('https://www.freepnglogos.com/uploads/search-png/search-icon-transparent-images-vector-16.png');
  background-position: 20px center;
  background-size: 18px;
  background-repeat: no-repeat;

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;

  &:focus {
    padding: 20px 48px 20px 20px;
    background-image: none;
  }
  &::-webkit-search-cancel-button {
    position: relative;
    right: -20px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.button`
  background-color: #007be9;
  border: none;
  width: 48px;
  height: 48px;
  margin: auto;
  margin-right: 8px;
  border-radius: 50%;
  cursor: pointer;
  svg {
    color: white;
    width: 21px;
    height: 21px;
  }
`;
