  
import BaseService from './BaseService'

export default class QuestionService extends BaseService {
    
    getAllQuestions() {
        return this.baseApi({
            method: 'GET',
            url: '/api/main/'
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

    updateQuestion(questionId) {
        return this.authorizedApi({
            method: 'PUT',
            url: `/api/questions/${questionId}`
        })
    }

    deleteQuestion(questionId){
        return this.authorizedApi({
            method:'DELETE',
            url: `/api/questions/${questionId}`
        })
    }
}