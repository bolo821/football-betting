import { combineReducers } from 'redux';
import user from './user';
import flow from './flow';

export default combineReducers({
    user,
    flow,
});