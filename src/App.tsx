import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import MainLabel from './components/MainLabel';
import SearchForm from './components/SearchForm';
import SearchList from './components/SearchList';

interface IFetch {
  name: string;
  id: number;
}
function App() {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<IFetch>('/api/v1/search-conditions/?name=갑상선');
        console.log('response data: ', data);
      } catch (error) {
        console.error('fetch error: ', error);
      }
    })();
  }, []);

  return (
    <MainOutlet>
      <MainContainer>
        <MainLabel />
        <SearchForm />
        <SearchList />
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
