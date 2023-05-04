import { useEffect, useState, KeyboardEvent } from 'react';
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
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const debouncedSearchText = useDebounce(inputValue, 200);
  const isNoData = serverDataList.length === 0;

  const inputOnClickHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const dropdownCloseHandler = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '') return;

    const lastIndex = serverDataList.length - 1;

    if (e.key === 'ArrowUp') {
      selectedIndex === -1 ? setSelectedIndex(lastIndex) : setSelectedIndex(selectedIndex - 1);
    }

    if (e.key === 'ArrowDown') {
      selectedIndex === lastIndex ? setSelectedIndex(-1) : setSelectedIndex(selectedIndex + 1);
    }
  };

  useEffect(() => {
    (async () => {
      // TODO: trim() 가독성 개선하기
      if (inputValue === null || inputValue.trim() === '') return;

      let serverData;
      try {
        serverData = await getServerData({ name: debouncedSearchText }, { isCached: true });
      } catch (error) {
        console.log(error);
      }

      if (serverData === null) return;

      setSelectedIndex(-1);
      setServerDataList(serverData.slice(0, 9));
    })();
  }, [debouncedSearchText]);

  return (
    <Container onClick={dropdownCloseHandler}>
      <ContentWrapper>
        <Title />
        <SearchInput
          onChange={e => setInputValue(e.target.value)}
          onClick={inputOnClickHandler}
          onKeyUp={onKeyUpHandler}
        />
        {isOpen && (
          <DropdownContainer>
            <li id="recommendKeywordLabel">추천 검색어</li>
            {isNoData && <li id="noDataLabel">추천 검색어 없음</li>}
            {serverDataList.map((data, dataIndex) => (
              <DropdownList
                keyword={data.name}
                key={data.id}
                selectedIndex={selectedIndex}
                dataIndex={dataIndex}
              />
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
  padding-bottom: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  #recommendKeywordLabel {
    padding: 32px 12px 20px 25px;
    color: #6a737b;
    font-size: 13px;
  }

  #noDataLabel {
    padding: 8px 12px 25px 25px;
  }
`;
