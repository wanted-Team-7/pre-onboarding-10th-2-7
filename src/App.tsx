import { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchList from './components/SearchList';
import * as S from './styles/app.style';

function App() {
  const [showList, setShowList] = useState(false);
  const onFocus = () => {
    setShowList(true);
  };
  const onBlur = () => {
    setShowList(false);
  };
  return (
    <>
      <S.Layout>
        <S.Wrapper>
          <S.StyledH2>
            <br />
            국내 모든 임상시험 검색하고
            <br />
            온라인으로 참여하기
          </S.StyledH2>
          <SearchForm onFocus={onFocus} onBlur={onBlur} />
          {showList ? <SearchList onFocus={onFocus} onBlur={onBlur}></SearchList> : null}
        </S.Wrapper>
      </S.Layout>
    </>
  );
}

export default App;
