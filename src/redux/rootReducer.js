import { combineReducers } from 'redux';
import uploadReducer from './reducers/uploadReducer';
import filesReducer from './reducers/filesReducer';
import downloadReducer from './reducers/downloadReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  userReducer,
  filesReducer,
  uploadReducer,
  downloadReducer,
});
export default rootReducer;
