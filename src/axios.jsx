import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:4800',
    withCredentials: true
});

export default api;
