import axios from 'axios';

const LOCALHOST = 'http://localhost';
const BACKEND_SERVER = 'https://ujfup18g68.execute-api.ap-northeast-2.amazonaws.com/';

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
