import axios from 'axios';

export const getSearchResults = async (SearchTerm: string) => {
  try {
    if (SearchTerm) {
      const response = await axios.get(`api/v1/search-conditions/?name=${SearchTerm}`);
      console.info('calling api');
      return response.data;
    }
    return undefined;
  } catch {
    alert('결과를 불러오는 중 에러가 발생했습니다.');
  }
};
