import axios from 'axios';

const LOCALHOST = 'http://localhost';
const BACKEND_SERVER = 'http://3.37.60.164';

export default axios.create({
  baseURL: `${BACKEND_SERVER}:3000/`,
});
