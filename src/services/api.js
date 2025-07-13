import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend URL
    withCredentials: true, // IMPORTANT: This allows cookies to be sent
});

export default api;