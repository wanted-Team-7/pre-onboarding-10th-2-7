import axios from 'axios';
import { API_URL } from '../constants';

export const getSearchWord = async word => {
  if (word === '') return { data: [] };
  console.info('calling api');
  return axios.get(API_URL, { params: { name: word } });
};
