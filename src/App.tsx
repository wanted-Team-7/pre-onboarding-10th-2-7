import styled from 'styled-components';

function App() {
  return (
    <Main>
      <Title>원티드 프리온보딩 프론트엔드 인턴십(4월) 2주차 기업과제</Title>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 14px;
`;

export default App;
