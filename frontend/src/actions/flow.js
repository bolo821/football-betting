import { SET_LOADING } from "./type";
import { getEarnings, getMultipliers, getBetStatus, getBetResult, getBetAmount, getTotalBet, getBetStatsData } from "./transaction";
import { SOCKET } from "../config/apis";

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
        dispatch(getBetStatsData());

        let account = getState().user.wallet;
        if (account) {
            dispatch(getEarnings(account));
            dispatch(getBetAmount(account));
        }
    });
}

export const onStatusUpdate = () => dispatch => {
    SOCKET.removeAllListeners("UPDATE_STATUS");

    SOCKET.on('UPDATE_STATUS', () => {
        dispatch(getBetStatus());       
    });
}