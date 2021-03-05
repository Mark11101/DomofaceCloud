import axios from 'axios'

export default axios.create({
  baseUrl: 'http://192.168.1.123:8000',
  withCredentials: true,
});
