import axios from 'axios';
import { Cookies } from 'react-cookie';

const LOCALHOST = 'http://localhost:3000/';
const BACKEND_SERVER = 'https://begin-vegan-backend.kro.kr:3000/';

const headers = {
  // 기본 헤더 설정 (옵션)
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const Axios = axios.create({
  baseURL: `${LOCALHOST}`,
  timeout: 5000, // 요청 타임아웃 설정 (옵션)
  headers: headers,
  withCredentials: true,
});

// Create a new instance of Cookies
const cookies = new Cookies();

// Request interceptor
Axios.interceptors.request.use(
  config => {
    const JSESSIONID = cookies.get('JSESSIONID');
    if (JSESSIONID) {
      console.log('sent JSESSIONID in cookie');
      config.headers['Authorization'] = `Bearer ${JSESSIONID}`;
    } else {
      console.log('no JSESSIONID in cookie');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
Axios.interceptors.response.use(
  response => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const cookieValue = setCookieHeader.split(';')[0];
      cookies.set('JSESSIONID', cookieValue, { path: '/' });
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default Axios;
