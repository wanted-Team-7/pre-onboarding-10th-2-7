import axios from 'axios';

const callApi = () => {
  axios.get(`/api/v1/search-conditions/?name=갑상선`).then(res => {
    localStorage.setItem('list', res.data);
  });
};

export default callApi;
