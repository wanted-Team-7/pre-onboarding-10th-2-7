import { useState } from 'react';
import styled from 'styled-components';
import { SearchResultTypes } from './types/search';
import MainLabel from './components/MainLabel';
import SearchForm from './components/SearchForm';
import SearchList from './components/SearchList';

function App() {
  const [searchResult, setSearchResult] = useState<SearchResultTypes[]>([]);

  return (
    <MainOutlet>
      <MainContainer>
        <MainLabel />
        <SearchForm setSearchResult={setSearchResult} />
        <SearchList searchResult={searchResult} />
      </MainContainer>
    </MainOutlet>
  );
}

export default App;

const MainOutlet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: LightSkyBlue;
`;

const MainContainer = styled.div`
  width: 500px;
  margin: 0 auto;
`;
