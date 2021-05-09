  
import BaseService from './BaseService'

export default class QuestionService extends BaseService {
    
    getAllQuestions(params) {
        return this.baseApi({
            method: 'GET',
            url: '/api/main/',
            params: params
        });
    }

    getMostLiked() {
        return this.baseApi({
            method: 'GET',
            url: '/api/main/likes'
        });
    }

    addQuestion(params) {
        return this.authorizedApi({
            method: 'POST',
            url: `/api/questions/`,
            data: params
        })
            .then(response => {
                return response.data;
            });
    }

    questionPage(questionId) {
        return this.authorizedApi({
            method: 'GET',
            url: `/api/questions/page/${questionId}`
        })
    }

    getById(questionId) {
        return this.authorizedApi({
            method:'GET',
            url: `/api/questions/${questionId}`
        })
    }

    updateQuestion(params) {
        return this.authorizedApi({
            method: 'PUT',
            url: `/api/questions/`,
            data: params
        })
    }

    deleteQuestion(questionId){
        return this.authorizedApi({
            method:'DELETE',
            url: `/api/questions/${questionId}`
        })
    }

    getByUserId(userId, params) {
        return this.authorizedApi({
            method:'GET',
            url: `/api/questions/profile/${userId}`,
            params: params
        })
    }

    likeQuestion(questionId) {
        return this.authorizedApi({
            method: 'POST',
            url: `api/questions/like/${questionId}`
        })
    }

    dislikeQuestion(questionId) {
        return this.authorizedApi({
            method: 'DELETE',
            url: `api/questions/like/${questionId}`
        })
    }
}