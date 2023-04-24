import axios from 'axios';

class HttpService {
  constructor(config) {
    this.config = config;
    const service = axios.create({
      baseURL: 'http://localhost',
      withCredentials: true,
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
  }
  handleSuccess(response) {
    return response;
  }
  handleError(error) {
    switch (error.status) {
      case 401:
        const success = this.tryRefreshToken(error.config);
        if (success) return this.service(error.config);
        return this.logout;

      case 404:
        this.redirectTo('/404');
        break;
      default:
        this.redirectTo('/500');
        break;
    }
    return Promise.reject(error);
  }
  logout() {}

  redirectTo(url) {
    window.location.href = url;
  }
  async tryRefreshToken(originalRequest) {
    this.service.post('/token', { withCredentials: true }).then(
      (response) => {
        return true;
      },
      (error) => {
        return false;
      },
    );
  }
  get(...args) {
    return this.service.get(...args);
  }
  post(...args) {
    return this.service.post(...args);
  }
  delete(...args) {
    return this.service.delete(...args);
  }
}
export default new HttpService();
