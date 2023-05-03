import axios from 'axios';
import { CACHE_EXPIRE_TIME_SEC } from '../constants/constant';

export interface ISearchData {
  name: string;
  id: number;
}

const cache: {
  [key: string]: ISearchData[];
} = {};

const caching = (key: string, data: ISearchData[]) => {
  cache[key] = data;
  setTimeout(() => {
    delete cache[key];
  }, CACHE_EXPIRE_TIME_SEC * 1000);
};

export const getSearchData = async (keyword: string) => {
  if (keyword.trim() === '') return []; // 빈 키워드 값은 api 호출 제외
  if (cache[keyword]) return cache[keyword]; // 캐싱

  try {
    const res = await axios.get<ISearchData[]>(`/api/v1/search-conditions/?name=${keyword}`);
    console.info('calling api', res);

    if (res.statusText !== 'OK') throw new Error(`${res.statusText} (${res.status})`);

    const data = res.data.slice(0, 7);
    caching(keyword, data);
    return data;
  } catch (error) {
    console.error('Fetch error! ', error);
    throw error;
  }
};
