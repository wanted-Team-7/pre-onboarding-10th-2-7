import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchInput from '../components/SearchInput';
import DropdownList from '../components/DropdownList';
import Title from '../components/Title';
import { getServerData } from '../apis/getServerData';
import { DataItem } from '../types/DataType';
import useDebounce from '../hooks/useDebounce';

export default function SearchPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [serverDataList, setServerDataList] = useState<DataItem[]>([]);

  const debouncedSearchText = useDebounce(inputValue, 200);
  const isNoData = serverDataList.length === 0;

  const inputOnClickHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const dropdownCloseHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (inputValue === null || inputValue.trim() === '') return;

      let serverData;
      try {
        serverData = await getServerData({ name: debouncedSearchText }, { isCached: true });
      } catch (error) {
        console.log(error);
      }

      if (serverData === null) return;

      setServerDataList(serverData);
    })();
  }, [debouncedSearchText]);

  return (
    <Container onClick={dropdownCloseHandler}>
      <ContentWrapper>
        <Title />
        <SearchInput onChange={e => setInputValue(e.target.value)} onClick={inputOnClickHandler} />
        {isOpen && (
          <DropdownContainer>
            <li id="recommendKeywordLabel">추천 검색어</li>
            {isNoData && <li id="noDataLabel">추천 검색어 없음</li>}
            {serverDataList.map(data => (
              <DropdownList keyword={data.name} key={data.id} />
            ))}
          </DropdownContainer>
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

const DropdownContainer = styled.ul`
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

  #noDataLabel {
    padding: 8px 12px;
  }
`;
