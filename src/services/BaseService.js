  
import axios from 'axios';
import {authorizedApi} from './calls';

export default class BaseService {

    baseApi(params) {
        return axios.create({
            baseURL: process.env.REACT_APP_ENDPOINT
        })(params);
    }

    authorizedApi(params) {
        return authorizedApi(params);
    }
}