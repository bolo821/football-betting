import { combineReducers } from 'redux';
import user from './user';
import flow from './flow';
import transaction from './transaction';
import match from './match';
import event from './event';
import wci from './wci';
import collateral from './collateral';
import referral from './referral';
import leaderboard from './leaderboard';
import general from './general';

export default combineReducers({
    user,
    flow,
    transaction,
    match,
    event,
    wci,
    collateral,
    referral,
    leaderboard,
    general,
});