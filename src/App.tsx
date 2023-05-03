import axios from 'axios';
import { useEffect } from 'react';

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

  return <h1>원티드 프리온보딩 프론트엔드 인턴십(4월) 2주차 기업과제, 7팀</h1>;
}

export default App;
