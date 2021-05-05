import BaseService from './BaseService'
import { setSession } from '../utils/LocalStorage/LocalStorage';

export default class AuthService extends BaseService {

  login(params) {
    return this.baseApi({
      method: 'POST',
      url: '/api/auth/login',
      data: params
    })
      .then(response => {
        setSession(JSON.stringify(response.data.data), response.data.data.token);
        return response.data;
      });
  }

  register(params) {
    return this.baseApi({
      method: 'POST',
      url: '/api/auth/register',
      data: params
    });
  }
}