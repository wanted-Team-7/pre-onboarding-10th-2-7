import React from 'react';
import styled from 'styled-components';
import InputIcon from './InputIcon';

interface ISearchForm {
  value: string;
  isFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearKeyword: React.Dispatch<React.SetStateAction<string>>;
}

function SearchForm(props: ISearchForm) {
  const formSumbitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const deleteHandler = () => {
    props.clearKeyword('');
  };

  return (
    <Form onSubmit={formSumbitHandler} isFocused={props.isFocused}>
      <SearchInput type="text" placeholder="질환명을 입력해 주세요." {...props} />
      <InputIcon isFocused={props.isFocused} deleteHandler={deleteHandler} />
    </Form>
  );
}

const Form = styled.form<{ isFocused: boolean }>`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  border: ${props => (props.isFocused ? '2px solid #0074cc;' : '2px solid white')};
  border-radius: 28px;
  padding: 10px 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  font-size: 18px;
  outline: none;

  margin-left: 10px;

  &:focus {
    border: none;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export default SearchForm;
