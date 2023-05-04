import { fetchData } from './axiosInstance';
import { cacheStorage } from '../utils/cacheStorage';

export const getServerData = async (params: Record<string, string>, { isCached = false }) => {
  const paramsData = new URLSearchParams(params).toString();

  const addParams = `?${paramsData}`;

  if (isCached && cacheStorage.getServerData(decodeURI(addParams)) !== null) {
    return cacheStorage.getServerData(decodeURI(addParams));
  }

  const { data } = await fetchData(addParams);

  if (isCached) {
    cacheStorage.setStorageItem(decodeURI(addParams), data);
  }
  return data;
};
