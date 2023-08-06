import axios from 'axios';

// export const BASE_IMAGE_PATH = 'https://936b-111-119-49-108.ngrok-free.app';
export const BASE_IMAGE_PATH = 'https://74b7-111-119-49-217.ngrok-free.app';
const axiosInstance3 = axios.create({ baseURL: `${BASE_IMAGE_PATH}/api` });
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axiosInstance3.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance3;
