import axios from 'axios';

const api = axios.create({
    baseURL: 'https://voters-production-37c7.up.railway.app/api',
});

export default api;
