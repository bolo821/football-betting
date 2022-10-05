import { SET_LOADING } from "./type";
import { getEarnings, getMultipliers, getBetStatus, getBetResult } from "./transaction";
import { SOCKET } from "../config/api";

export const setLoading = data => {
    return {
        type: SET_LOADING,
        payload: data,
    }
}

export const onBet = (contract) => (dispatch, getState) => {
    SOCKET.removeAllListeners("BET");

    SOCKET.on('BET', () => {
        let account = getState().user.wallet;

        if (account) {
            dispatch(getEarnings(contract, account));
            dispatch(getMultipliers(contract));
            dispatch(getBetStatus(contract));
            dispatch(getBetResult(contract));
        }
    });
}