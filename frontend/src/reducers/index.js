import { combineReducers } from 'redux';
import user from './user';
import flow from './flow';
import transaction from './transaction';
import match from './match';

export default combineReducers({
    user,
    flow,
    transaction,
    match,
});