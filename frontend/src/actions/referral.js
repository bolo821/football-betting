import { api } from "../config/apis";
import { SET_REFERRAL } from "./type";

export const getReferralData = (account) => async (dispatch) => {
    try {
        const refData = await api.get(`/referral/${account}`);

        let profit = 0;
        const referredUsers = refData.data;

        for (let i=0; i<referredUsers.length; i++) {
            profit += referredUsers[i].referrerEarned;
        }

        dispatch({
            type: SET_REFERRAL,
            payload: {
                count: referredUsers.length,
                profit,
            }
        });
    } catch (err) {
        console.log('error in getting referal data: ', err);
    }
}

export const addReferrer = (data) => async (dispatch) => {
    try {
        await api.post('/referral', data);
    } catch (err) {
        console.log('error in adding referrer: ', err);
    }
}