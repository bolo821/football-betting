import { SET_LOADING } from "./type";
import { getEarnings, getMultipliers, getBetStatus, getBetResult, getBetAmount, getTotalBet, getBetStatsData, getMatch } from "./";
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
        dispatch(getMatch());

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

export const onClaimed = () => dispatch => {
    SOCKET.removeAllListeners("CLAIMED");

    SOCKET.on("CLAIMED", () => {
        dispatch(getBetStatsData());
    });
}

export const onMatchScoreUpdatd = () => dispatch => {
    SOCKET.removeAllListeners("UPDATE_SCORE");

    SOCKET.on("UPDATE_SCORE", () => {
        dispatch(getMatch());
    });
}