import { SET_LOADING } from "./type";

export const setLoading = data => {
    return {
        type: SET_LOADING,
        payload: data,
    }
}