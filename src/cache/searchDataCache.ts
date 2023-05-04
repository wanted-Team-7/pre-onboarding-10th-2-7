import { ISearchData } from '../apis/searchApi';
import { CACHE_EXPIRE_TIME_SEC } from '../constants/constant';

class SearchDataCache {
  private cache: {
    [key: string]: ISearchData[];
  } = {};

  private cacheTime: { [key: string]: number } = {};

  get(key: string) {
    return this.cache[key];
  }

  add(key: string, data: ISearchData[]) {
    this.cache[key] = data;
    this.cacheTime[key] = new Date().getTime() + CACHE_EXPIRE_TIME_SEC * 1000;
  }

  isCacheTimeValid(key: string) {
    const currentTime = new Date().getTime();
    return currentTime < this.cacheTime[key];
  }
}

export default new SearchDataCache();
