import * as S from '../styles/searchForm.style';
import { LargeSearchIcon } from '../assets/MagnifierSVG';
import SearchList from './SearchList';

interface SearchFormProps {
  onFocus: () => void;
  onBlur: () => void;
}

const SearchForm = ({ onFocus, onBlur }: SearchFormProps) => {
  return (
    <>
      <S.StyledForm>
        <S.StyledLabel>
          <S.StyledInput placeholder="질환명을 입력해 주세요" onFocus={onFocus} onBlur={onBlur} />
        </S.StyledLabel>
        <LargeSearchIcon />
      </S.StyledForm>
      <SearchList onFocus={onFocus} onBlur={onBlur}></SearchList>
    </>
  );
};

export default SearchForm;
