  
import axios from 'axios';
import BaseService from './BaseService';
import {authorizedApi} from './calls';

export default class AnswerService extends BaseService {

    
    addAnswer(params) {
        return this.authorizedApi({
            method: 'POST',
            url: `/api/answers/`,
            data: params
        })
            .then(response => {
                return response.data;
            });
    }

    getById(answerId) {
        return this.authorizedApi({
            method: 'GET',
            url: `/api/answers/${answerId}`
        })
    }

    updateAnswer(params) {
        return this.authorizedApi({
            method: 'PUT',
            url: `/api/answers/`,
            data: params
        })
    }

    deleteAnswer(id) {
        return this.authorizedApi ({
            method: 'DELETE',
            url: `/api/answers/${id}`
        })
    }

}