import axios from 'axios';
import config from '../config';
import { authInterceptor } from './authInterceptor';

class FileApi {
  constructor(status) {
    this.withAuth = status && status.withAuth ? status.withAuth : false;
    this.instance = axios.create({ baseURL: config.url.FILE_API_URL, withCredentials: this.withAuth });
    return this.init();
  }
  init() {
    if (!this.withAuth) return this.instance;
    return authInterceptor(this.instance);
  }
}
export default FileApi;
