import config from '../config';
import { authInterceptor } from './authInterceptor';
const { default: axios } = require('axios');

class AuthApi {
  constructor(status) {
    this.withAuth = status && status.withAuth ? status.withAuth : false;
    this.instance = axios.create({
      baseURL: config.url.AUTH_API_URL,
      withCredentials: true,
    });
    return this.init();
  }
  init() {
    if (!this.withAuth) return this.instance;
    return authInterceptor(this.instance);
  }
}
export default AuthApi;
