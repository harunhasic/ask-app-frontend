  
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
          url: '/api/main/answers'
      });
  }

  userProfile(id) {
    return this.authorizedApi({
      method:'GET',
      url: `/api/user/profile/${id}`
    })
  }

  updateUser(params) {
    return this.authorizedApi({
      method: 'PUT',
      url: '/api/user/profile',
      data: params
    })
  }
}
