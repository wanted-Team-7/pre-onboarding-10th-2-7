import React from 'react';
import { S } from './main.styled';
import InputBox from '../components/inputBox/inputBox';
import SearchBox from '../components/searchBox/searchBox';
import { useState } from 'react';

const Main = () => {
  const [searchList, setSearchList] = useState<[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isInputValue, setIsInputValue] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const handleKeyboard = (e: React.KeyboardEvent) => {
    if (!isFocus || searchList.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentIndex(prev => (prev < searchList.length - 1 ? prev + 1 : prev));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>
          국내 모든 임상시험 검색하고 <br />
          온라인으로 참여하기
        </S.Title>
        <InputBox
          setSearchList={setSearchList}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          setIsInputValue={setIsInputValue}
          isInputValue={isInputValue}
          handleKeyboard={handleKeyboard}
          setCurrentIndex={setCurrentIndex}
        />
        {isFocus ? <SearchBox searchList={searchList} currentIndex={currentIndex} /> : null}
      </S.Wrapper>
    </S.Container>
  );
};

export default Main;
