import AuthApi from '../../api/authApi';
import store from '../store';

const apiWithAuth = new AuthApi({ withAuth: true });
const api = new AuthApi();

store.subscribe(() => localStorage.setItem('TOKEN', store.getState().userReducer.accessToken));
export function getAuth(data, type) {
  return async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    api
      .post(type === 'login' ? '/login' : '/register', data)
      .then((res) => {
        dispatch({ type: 'SET_AUTH', payload: res.data });
      })
      .catch((err) => {
        const error = err.response.data;
        if (error) return dispatch({ type: 'ERROR', payload: error });

        dispatch({ type: 'ERROR', payload: { param: 'server', msg: 'Something went wrong' } });
      });
  };
}

export function refreshToken() {
  return async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    apiWithAuth
      .get('/token')
      .then((res) => dispatch({ type: 'UPDATE_TOKEN', payload: res.data }))
      .catch((err) => dispatch({ type: 'ERROR', payload: err }));
  };
}
export function getUser() {
  return async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    await apiWithAuth.get('/user').then((res) => {
      dispatch({ type: 'UPDATE_USER', payload: res.data });
    });
  };
}
export function logout() {
  return (dispatch) => {
    apiWithAuth.get('/logout').then((res) => {
      localStorage.removeItem('TOKEN');
      dispatch({ type: 'LOGOUT' });
    });
  };
}
