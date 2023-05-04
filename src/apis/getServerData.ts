import { fetchData } from './axiosInstance';
import { cacheStorage } from '../utils/cacheStorage';

export const getServerData = async (params: Record<string, string>, { isCached = false }) => {
  const paramsData = new URLSearchParams(params).toString();

  const addParams = `?${paramsData}`;

  // isCached가 true && 서버데이터 value가 있다면 서버 데이터 value를 리턴
  // [decodeURI란? -> encodeURI를 통해서 만들어진 URI 이스케이핑(사용자가 입력한 키워드)을 디코드]
  if (isCached && cacheStorage.getServerData(decodeURI(addParams)) !== null) {
    return cacheStorage.getServerData(decodeURI(addParams));
  }

  // 로컬스토리지에 데이터가 있으면 서버 요청을 안함
  // get 요청하고 가져온 response 데이터
  const { data } = await fetchData(addParams);

  // isCached가 true면 로컬스토리지에 추가
  if (isCached) {
    cacheStorage.setStorageItem(decodeURI(addParams), data);
  }
  return data;
};
