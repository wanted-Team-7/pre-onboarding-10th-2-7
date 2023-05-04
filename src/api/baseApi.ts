import axios from 'axios';

const CAHCE_NAME = 'search-result';

export const getSearchResult = async (word: string) => {
  const URL = `/api/v1/search-conditions/?name=${word}`;
  const cachedData = await caches.match(URL);

  if (word.trim().length === 0) return [];

  if (cachedData) {
    const cachedDataList = await cachedData.json();
    return cachedDataList.slice(0, 7);
  }

  try {
    const res = await axios.get(URL);

    console.info('calling api', res);

    if (res.status !== 200) return;

    caches.open(CAHCE_NAME).then(cache => {
      cache.add(URL);
    });

    const result = res.data.slice(0, 7);

    return result;
  } catch (error) {
    console.error(error);
  }
};
