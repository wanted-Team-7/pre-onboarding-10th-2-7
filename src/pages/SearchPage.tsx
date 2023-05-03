import { useState } from 'react';
import styled from 'styled-components';
import SearchInput from '../components/SearchInput';
import DropdownList from '../components/DropdownList';
import Title from '../components/Title';

export default function SearchPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  console.log(inputValue);

  const inputOnClickHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const searchCloseHandler = () => {
    setIsOpen(false);
  };

  const testArr = ['간상선암', '갑상선염', '갑상선중독증', '갑상선 항진증'];

  return (
    <Container onClick={searchCloseHandler}>
      <ContentWrapper>
        <Title />
        <SearchInput onChange={e => setInputValue(e.target.value)} onClick={inputOnClickHandler} />
        {isOpen && (
          <SearchSelect>
            <li id="recommendKeywordLabel">추천 검색어</li>
            {testArr.map(item => (
              <DropdownList keyword={item} />
            ))}
          </SearchSelect>
        )}
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #cae9ff;

  width: 100vw;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 80px;
`;

const SearchSelect = styled.ul`
  max-width: 490px;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  margin-top: 8px;
  padding: 24px 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  #recommendKeywordLabel {
    padding: 8px 12px;
    color: #6a737b;
    font-size: 13px;
  }
`;
