import { SET_USER_WALLET } from "./type";

export const setUserWallet = wallet => {
    return {
        type: SET_USER_WALLET,
        payload: wallet,
    }
}