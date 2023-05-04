import styled from 'styled-components';

export const SearchList = styled.li<{ isFocus: boolean }>`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  border-radius: 42px;
  background-color: ${props => (props.isFocus ? 'white' : '')};
  > svg {
    width: 15px;
  }
`;
