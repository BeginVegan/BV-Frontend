import axios from 'axios';

const LOCALHOST = 'http://localhost';
const BACKEND_SERVER = 'https://begin-vegan-backend.kro.kr:3000/';

const headers = {
  // 기본 헤더 설정 (옵션)
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const Axios = axios.create({
  baseURL: `${BACKEND_SERVER}/`,
  timeout: 5000, // 요청 타임아웃 설정 (옵션)
  headers: headers,
  /**
   * js cookie 등을 깔아서 쿠키 설정해줘야함
   */
  // headers: {
  //   access_token: cookies.get('access_token'),
  // },
});

export default Axios;
