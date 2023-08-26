import axios from 'axios';

// export const BASE_IMAGE_PATH = 'https://3a3a-103-186-197-133.ngrok-free.app';
export const BASE_IMAGE_PATH =
  'https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21';
const axiosInstance2 = axios.create({ baseURL: `${BASE_IMAGE_PATH}/api` });
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axiosInstance2.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance2;
