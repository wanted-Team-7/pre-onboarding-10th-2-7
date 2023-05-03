import axios from 'axios';

export interface ISearchData {
  name: string;
  id: number;
}

export const getSearchData = async (keyword: string) => {
  if (keyword.trim() === '') return []; // 빈 키워드 값은 api 호출 제외
  try {
    const res = await axios.get<ISearchData[]>(`/api/v1/search-conditions/?name=${keyword}`);
    console.info('calling api', res); // 과제

    if (res.statusText !== 'OK') throw new Error(`${res.statusText} (${res.status})`);
    const data = res.data.slice(0, 7);

    return data;
  } catch (error) {
    console.error('Fetch error! ', error);
    throw error;
  }
};
