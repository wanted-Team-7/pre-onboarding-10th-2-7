import React from 'react';
import { S } from './main.styled';
import SearchForm from '../components/search/search';

const Main = () => {
  return (
    <S.Container>
      <S.Title>
        국내 모든 임상시험 검색하고 <br />
        온라인으로 참여하기
      </S.Title>
      <SearchForm />
    </S.Container>
  );
};

export default Main;
