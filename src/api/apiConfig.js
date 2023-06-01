import axios from 'axios';

const LOCALHOST = 'http://localhost';
const BACKEND_SERVER = 'https://ujfup18g68.execute-api.ap-northeast-2.amazonaws.com/';

const Axios = axios.create({
  baseURL: `${BACKEND_SERVER}/`,
  /**
   * js cookie 등을 깔아서 쿠키 설정해줘야함
   */
  // headers: {
  //   access_token: cookies.get('access_token'),
  // },
});

export default Axios;
