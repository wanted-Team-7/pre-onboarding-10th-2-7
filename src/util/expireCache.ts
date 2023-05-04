import { StorageItem } from '../type';
import { CHECK_CACHE_TIME } from '../constants';

export const handleExpireCache = () => {
  setInterval(() => {
    // 만료시간 지난 캐시 삭제
    console.log('expire');
    for (let elem in localStorage) {
      const cache = localStorage.getItem(elem);
      const localStorageElem: StorageItem = JSON.parse(cache!);
      if (localStorageElem?.expireTime && localStorageElem?.expireTime <= Date.now()) {
        localStorage.removeItem(elem);
      }
    }
  }, CHECK_CACHE_TIME);
};
