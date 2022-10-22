import { combineReducers } from 'redux';
import user from './user';
import flow from './flow';
import transaction from './transaction';
import match from './match';
import wci from './wci';

export default combineReducers({
    user,
    flow,
    transaction,
    match,
    wci,
});