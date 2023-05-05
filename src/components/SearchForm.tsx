import React from 'react';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import InputIcon from './InputIcon';

interface ISearchForm {
  value: string;
  isFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setElIndexFocused: React.Dispatch<React.SetStateAction<number>>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

function SearchForm(props: ISearchForm) {
  const formSumbitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocusOut = ({ target }: any) => {
    if (!formRef.current?.contains(target)) {
      props.setIsInputFocused(false);
      props.setElIndexFocused(-1);
    }
  };

  const onClickDeleteBtn = () => {
    props.setSearchKeyword('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    window.addEventListener('click', handleFocusOut);
    return () => {
      window.removeEventListener('click', handleFocusOut);
    };
  });

  return (
    <Form onSubmit={formSumbitHandler} isFocused={props.isFocused} ref={formRef}>
      <SearchInput
        ref={inputRef}
        type="text"
        placeholder="질환명을 입력해 주세요."
        onFocus={props.onFocus}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
      <InputIcon isFocused={props.isFocused} onClickDeleteBtn={onClickDeleteBtn} />
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
