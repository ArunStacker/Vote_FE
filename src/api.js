import axios from 'axios';

const api = axios.create({
    baseURL: 'https://vote-fe-arunstackers-projects.vercel.app/',
});

export default api;
