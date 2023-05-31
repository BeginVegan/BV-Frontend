import axios from 'axios';

const LOCALHOST = 'http://localhost';
const BACKEND_SERVER = 'https://ujfup18g68.execute-api.ap-northeast-2.amazonaws.com/';

export default axios.create({
  baseURL: `${BACKEND_SERVER}/`,
});
