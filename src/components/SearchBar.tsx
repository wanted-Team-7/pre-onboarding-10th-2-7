import styled from 'styled-components';
import { LargeSearchIcon } from '../assets/SearchSVG';
import SearchInputPlaceholder from '../views/SearchInputPlaceholder';
import React from 'react';

interface SearchBarProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  getSearchData: (event: React.FormEvent<HTMLFormElement>) => void;
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

const SearchBar = ({
  handleChange,
  searchQuery,
  getSearchData,
  isFocused,
  handleFocus,
  handleBlur,
}: SearchBarProps) => {
  return (
    <StyledForm onSubmit={getSearchData} isFocused={isFocused}>
      <StyledLabel htmlFor="search-input">
        <SearchInputPlaceholder isFocused={isFocused} value={searchQuery} />
        <StyledInput
          id="search-input"
          type="text"
          value={searchQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-label="검색어 입력"
        />
      </StyledLabel>
      <LargeSearchIcon getSearchData={getSearchData} />
    </StyledForm>
  );
};

const StyledForm = styled.form<{ isFocused: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 550px;
  height: 80px;
  border-radius: 42px;
  border: ${props => (props.isFocused ? '2px solid #2962ff' : '#fff')};
  transition: border-color 0.2s ease-in-out;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledInput = styled.input`
  width: 450px;
  height: 50px;
  outline: none;
  border: none;
  font-size: 18px;
  padding-left: 30px;
`;

export default SearchBar;
