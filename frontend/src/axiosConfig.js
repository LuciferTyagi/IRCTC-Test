import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://irctc-test-server-fpeug9343-lucifertyagis-projects.vercel.app/api', 
});

export default instance;
