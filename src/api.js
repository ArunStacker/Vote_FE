import axios from 'axios';

const api = axios.create({
    baseURL: 'voters-production-37c7.up.railway.app',
});

export default api;
