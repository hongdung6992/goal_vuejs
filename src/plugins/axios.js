import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://goal-laravel.herokuapp.com/api/v1/',
    // baseURL: 'http://192.168.1.125:8000/api/v1/',
    // timeout: 1000,
    headers: {
        'accept': 'application/json'
    }
});

export default axiosInstance;