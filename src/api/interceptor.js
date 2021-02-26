import axios from 'axios';

const interceptor = axios.interceptors.response.use((response) => {
  if (response.data.response) {
    let responseArray = response.data.response
    if (typeof responseArray === 'string') {
      throw new axios.Cancel('Operation canceled');
    } else {
      return response;
    }
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default interceptor;