import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = 'https://api.mandarin.weniv.co.kr';

const axiosUnauth: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

const axiosAuth: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosAuth.interceptors.request.use(
  (config) => {
    const TOKEN = JSON.parse(sessionStorage.getItem('user') as string)?.UserAtom.token;
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${TOKEN}`
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { axiosUnauth, axiosAuth };
