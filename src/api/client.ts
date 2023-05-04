import axios from 'axios';
import { API_URL, EXPIRE_TIME } from '../constants';

export const getSearchWord = async (word: string) => {
  if (word === '') return [];
  const checkCache: string | null = localStorage.getItem(word);

  if (!checkCache) {
    console.info('api 호출');
    const response = await axios.get(API_URL, { params: { name: word } });
    const setData = {
      data: response.data,
      expireTime: new Date().getTime() + EXPIRE_TIME,
    };

    localStorage.setItem(word, JSON.stringify(setData));
    return response.data;
  } else {
    return JSON.parse(checkCache).data;
  }
};
