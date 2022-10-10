import { SET_LOADING } from "./type";
import { getEarnings, getMultipliers, getBetStatus, getBetResult, getBetAmount, getTotalBet } from "./transaction";
import { SOCKET } from "../config/api";

export const setLoading = data => {
    return {
        type: SET_LOADING,
        payload: data,
    }
}

export const onBet = () => (dispatch, getState) => {
    SOCKET.removeAllListeners("BET");

    SOCKET.on('BET', () => {
        dispatch(getMultipliers());
        dispatch(getBetStatus());
        dispatch(getBetResult());
        dispatch(getTotalBet());

        let account = getState().user.wallet;
        if (account) {
            dispatch(getEarnings(account));
            dispatch(getBetAmount(account));
        }
    });
}