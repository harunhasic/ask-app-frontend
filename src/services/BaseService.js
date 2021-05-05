  
import axios from 'axios';
import {authorizedApi} from './calls';

export default class BaseService {

    baseApi(params) {
        return axios.create({
            baseURL: "http://localhost:8080"
        })(params);
    }

    authorizedApi(params) {
        return authorizedApi(params);
    }
}