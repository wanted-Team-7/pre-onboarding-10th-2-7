/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const APIbaseURL = '/api/v1/';

const axiosApi = ({ options }: any) => {
  const instance = axios.create({
    baseURL: APIbaseURL,
    ...options,
  });

  instance.interceptors.response.use(
    response => {
      console.log('interceptor > response', response);
      return response;
    },
    error => {
      console.log('interceptor > error', error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use(
    request => {
      console.log('interceptor > request', request);
      return request;
    },
    error => {
      console.log('interceptor > error', error);
      return Promise.reject(error);
    }
  );

  instance.defaults.timeout = 5000; // 5초
  return instance;
};

export const defaultInstance = axiosApi(APIbaseURL);
