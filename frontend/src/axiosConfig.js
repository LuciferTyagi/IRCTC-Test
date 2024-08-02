import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://irctc-test-server.vercel.app/api', 
});

export default instance;
