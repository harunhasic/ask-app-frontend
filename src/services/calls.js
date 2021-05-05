import axios from 'axios';
import { getToken } from '../utils/LocalStorage/LocalStorage';

export const authorizedApi = axios.create({
    baseURL: "http://localhost:8080"
});

authorizedApi.interceptors.request.use(config => {
    const token = getToken();
    config.headers['Authorization'] = token;
    return config;
});

export default authorizedApi;