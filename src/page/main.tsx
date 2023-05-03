import { useState } from 'react';
import { S } from './main.styled';
import InputBox from '../components/inputBox/inputBox';
import SearchBox from '../components/searchBox/searchBox';

const Main = () => {
  const [searchList, setSearchList] = useState<[]>([]);
  return (
    <S.Container>
      <S.Title>
        국내 모든 임상시험 검색하고 <br />
        온라인으로 참여하기
      </S.Title>
      <InputBox setSearchList={setSearchList} />
      <SearchBox searchList={searchList} />
    </S.Container>
  );
};

export default Main;
