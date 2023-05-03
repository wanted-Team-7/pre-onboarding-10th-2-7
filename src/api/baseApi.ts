import axios from 'axios';

export const getSearchResult = async (word: string) => {
  try {
    const { data } = await axios.get(`/api/v1/search-conditions/?name=${word}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
