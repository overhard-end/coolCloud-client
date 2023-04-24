import { combineReducers } from 'redux';
import uploadReducer from './reducers/uploadReducer';
import filesReducer from './reducers/filesReducer';
import downloadReducer from './reducers/downloadReducer';

const rootReducer = combineReducers({
  filesReducer,
  uploadReducer,
  downloadReducer,
});
export default rootReducer;
