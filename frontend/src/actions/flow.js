import { SET_LOADING } from "./type";
import {
    getTripleInformation,
    getSingleInformation,
    getBetStatsData,
    getMatch,
    getEvent,
    getGeneral,
    getLeaderboard
} from "./";
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
        dispatch(getMatch());
        dispatch(getEvent());
        dispatch(getGeneral());
        dispatch(getLeaderboard());
        
        let account = getState().user.wallet;
        if (account) {
            dispatch(getTripleInformation(account, 0));
            dispatch(getSingleInformation(account, 0));
            dispatch(getTripleInformation(account, 1));
            dispatch(getSingleInformation(account, 1));
        }
    });
}

export const onStatusUpdate = () => dispatch => {
    SOCKET.removeAllListeners("UPDATE_STATUS");

    SOCKET.on('UPDATE_STATUS', () => {
        dispatch(getSingleInformation(account, 0));
        dispatch(getSingleInformation(account, 1)); 
    });
}

export const onClaimed = () => dispatch => {
    SOCKET.removeAllListeners("CLAIMED");

    SOCKET.on("CLAIMED", () => {
        dispatch(getBetStatsData());
        dispatch(getLeaderboard());
    });
}

export const onMatchScoreUpdatd = () => dispatch => {
    SOCKET.removeAllListeners("UPDATE_SCORE");

    SOCKET.on("UPDATE_SCORE", () => {
        dispatch(getMatch());
        dispatch(getEvent());
        dispatch(getGeneral());
    });
}

export const onRefresh = () => (dispatch) => {
    SOCKET.removeAllListeners("REFRESH");

    SOCKET.on('REFRESH', () => {
        window.location.reload();
    });
}