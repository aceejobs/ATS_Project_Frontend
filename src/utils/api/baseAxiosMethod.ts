import axios from 'axios';

import { baseURL } from '../../constant/constants';

const baseAxiosMethod = axios.create({
  baseURL,
});

baseAxiosMethod.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export default baseAxiosMethod;
