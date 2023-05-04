import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchInput from '../components/SearchInput';
import DropdownList from '../components/DropdownList';
import Title from '../components/Title';
import { getServerData } from '../apis/getServerData';

export default function SearchPage() {
  interface DataItem {
    name: string;
    id: number;
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [serverDataList, setServerDataList] = useState<DataItem[]>([]);

  const inputOnClickHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const searchCloseHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (inputValue === null || inputValue.trim() === '') return;

      let serverData;
      try {
        serverData = await getServerData({ name: inputValue }, { isCached: true });
      } catch (error) {
        console.log(error);
      }

      if (serverData === null) return;

      setServerDataList(serverData);
    })();
  }, [inputValue]);

  return (
    <Container onClick={searchCloseHandler}>
      <ContentWrapper>
        <Title />
        <SearchInput onChange={e => setInputValue(e.target.value)} onClick={inputOnClickHandler} />
        {isOpen && (
          <SearchSelect>
            <li id="recommendKeywordLabel">추천 검색어</li>
            {serverDataList.map(data => (
              <DropdownList keyword={data.name} key={data.id} />
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
