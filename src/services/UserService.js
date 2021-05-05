  
import BaseService from './BaseService'

export default class UserService extends BaseService {

  getByMail(email) {
    return this.authorizedApi({
      method: 'GET',
      url: '/api/users/' + email
    });
  }

  getUsersByAnswers() {
      return this.baseApi({
          method: 'GET',
          url: 'api/main/answers'
      });
  }

}
