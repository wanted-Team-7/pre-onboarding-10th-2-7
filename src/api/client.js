import axios from 'axios';
import { API_URL } from '../constants';

export const getSearchWord = async word => {
  return axios.get(API_URL, { params: { name: word } });
};
