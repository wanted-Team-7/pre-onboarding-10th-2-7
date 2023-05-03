import styled from 'styled-components';
import InputIcon from './InputIcon';

function SearchForm() {
  return (
    <Form>
      <SearchInput type="text" placeholder="질환명을 입력해 주세요." />
      <InputIcon />
    </Form>
  );
}

const Form = styled.form`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: '2px solid rgba(0,0,0,0.7)';
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
