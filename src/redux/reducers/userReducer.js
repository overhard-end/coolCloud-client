const initialState = {
  email: '',
  id: '',
  accessToken: localStorage.getItem('TOKEN'),
  isLoading: false,
  error: {},
  inVerify:false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: {},
      };
    case 'SET_AUTH':
      return {
        ...state,
        email: action.payload.user.email,
        id: action.payload.user.id,
        accessToken: action.payload.accessToken,
        error: {},
        isLoading: false,
      };
      case 'IN_VERIFY':
        return {
          ...state,
         inVerify:true
        };
    case 'UPDATE_TOKEN':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        error: {},
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        error: {},
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        accessToken: '',
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default userReducer;
