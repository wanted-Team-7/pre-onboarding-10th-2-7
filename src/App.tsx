import axios from 'axios';
import { useEffect } from 'react';
import SearchPage from './pages/SearchPage';

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
    <>
      <SearchPage />
    </>
  );
}

export default App;
