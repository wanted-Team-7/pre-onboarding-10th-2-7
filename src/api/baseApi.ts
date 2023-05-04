import axios from 'axios';

export const getSearchResult = async (word: string) => {
  if (word.trim().length === 0) return [];

  try {
    const res = await axios.get(`/api/v1/search-conditions/?name=${word}`);

    if (res.status !== 200) return;

    const result = res.data.slice(0, 7);

    return result;
  } catch (error) {
    console.log(error);
  }
};
