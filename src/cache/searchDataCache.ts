import { ISearchData } from '../apis/searchApi';
import { CACHE_EXPIRE_TIME_SEC } from '../constants/constant';

export class SearchDataCache {
  private cache: {
    [key: string]: ISearchData[];
  } = {};

  private cacheTime: { [key: string]: number } = {};

  private expireTime = 0;

  constructor(time: number) {
    this.expireTime = time;
  }

  get(key: string) {
    return this.cache[key];
  }

  add(key: string, data: ISearchData[]) {
    this.cache[key] = data;
    this.cacheTime[key] = new Date().getTime() + this.expireTime * 1000;
  }

  isCacheTimeValid(key: string) {
    const currentTime = new Date().getTime();
    return currentTime < this.cacheTime[key];
  }
}

export default new SearchDataCache(CACHE_EXPIRE_TIME_SEC);
