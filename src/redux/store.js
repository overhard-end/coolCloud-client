import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhence = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, composedEnhence);

export default store;
