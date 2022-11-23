import { api } from "../config/apis";
import { SET_LEADERBOARD } from "./type";

export const getLeaderboard = () => async (dispatch) => {
    try {
        const leaderboardData = await api.get(`/leaderboard`);

        dispatch({
            type: SET_LEADERBOARD,
            payload: leaderboardData.data,
        });
    } catch (err) {
        console.log('error in getting leaderboard data: ', err);
    }
}

export const updateLeaderboard = (account, data) => async (dispatch) => {
    try {
        await api.put(`/leaderboard/${account}`, data);
    } catch (err) {
        console.log('error in adding leaderboard: ', err);
    }
}