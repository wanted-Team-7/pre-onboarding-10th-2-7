import styled from 'styled-components';

export const SearchInputArea = styled.div`
  position: relative;
  width: fit-content;
  margin: 0 auto;
`;

export const SearchInput = styled.input`
  width: 490px;
  padding: 20px 10px 20px 24px;
  border: 2px solid #ffffff;
  border-radius: 42px;
  font-size: 18px;
  &::placeholder {
    color: #a7afb7;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 68px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: #a8afb6;
  cursor: pointer;
  > span {
    color: #ffffff;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  padding: 1px 6px;
  border: none;
  border-radius: 50%;
  background-color: #007be9;
  cursor: pointer;
  > span {
    display: none;
  }
  > svg {
    width: 21px;
    height: 21px;
  }
`;
