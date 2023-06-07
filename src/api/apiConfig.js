import axios from 'axios';

const LOCALHOST = 'http://localhost';
const BACKEND_SERVER = 'https://begin-vegan-backend.kro.kr:3000/';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Accept: '*/*',
};

const Axios = axios.create({
  baseURL: `${BACKEND_SERVER}/`,
  headers: headers,
  /**
   * js cookie 등을 깔아서 쿠키 설정해줘야함
   */
  // headers: {
  //   access_token: cookies.get('access_token'),
  // },
});

export default Axios;
