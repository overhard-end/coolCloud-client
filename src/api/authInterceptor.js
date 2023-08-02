import { logout, refreshToken } from '../redux/actions/userActions';
import store from '../redux/store';

export function authInterceptor(instance) {
  instance.interceptors.request.use((req) => {
    if (req.url === '/token' || req.url === '/logout') return req;
    const accessToken = store.getState().userReducer.accessToken;
    if (!accessToken) return null
    req.headers['Authorization'] = 'Bearer ' + accessToken;
    req.withCredentials = false;
    return req;
  });
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true;
        if(originalRequest.url==='/user'){
           store.dispatch(refreshToken())
          
        }
      }
      return error;
    },
  );
  return instance;
}
