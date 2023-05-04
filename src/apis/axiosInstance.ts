import axios from 'axios';
import { PATH_URL } from '../constants';

const instance = axios.create({
  baseURL: PATH_URL,
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => Promise.reject(error)
);

export const fetchData = (urlParameter: string) => {
  console.info('calling api');
  return instance.get(urlParameter);
};
