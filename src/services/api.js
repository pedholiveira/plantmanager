import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.139.225.220:80'
});

export default api;