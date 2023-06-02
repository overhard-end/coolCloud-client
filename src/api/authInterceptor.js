import { refreshToken } from '../redux/actions/userActions';
import store from '../redux/store';

export function authInterceptor(instance) {
  instance.interceptors.request.use((req) => {
    if (req.url === '/token' || req.url === '/logout') return req;
    const accessToken = store.getState().userReducer.accessToken;
    if (!accessToken) return req;
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
        await store.dispatch(refreshToken());
        store.subscribe(() => instance(originalRequest));
      }
      return error;
    },
  );
  return instance;
}
