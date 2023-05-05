import axios from 'axios';
import searchDataCache from '../cache/searchDataCache';

export interface ISearchData {
  name: string;
  id: number;
}

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

export const getSearchData = async (keyword: string) => {
  if (keyword.trim() === '') return [];
  if (searchDataCache.isCacheTimeValid(keyword)) return searchDataCache.get(keyword);

  try {
    const res = await axios.get<ISearchData[]>(`${PROXY}/v1/search-conditions/?name=${keyword}`);
    console.info('calling api');

    if (res.statusText !== 'OK') throw new Error(`${res.statusText} (${res.status})`);

    const data = res.data.slice(0, 7);
    searchDataCache.add(keyword, data);
    return data;
  } catch (error) {
    console.error('Fetch error! ', error);
    throw error;
  }
};
