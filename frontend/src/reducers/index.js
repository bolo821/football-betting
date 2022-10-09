import { combineReducers } from 'redux';
import user from './user';
import flow from './flow';
import transaction from './transaction';

export default combineReducers({
    user,
    flow,
    transaction,
});