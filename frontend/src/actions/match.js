import { api, SOCKET } from "../config/apis";
import { toast } from "react-toastify";
import { SET_MATCH } from "./type";
import { createMatch } from "./transaction";
import { setLoading } from "./flow";

export const addMatch = data => async dispatch => {
    try {
        let createResOnBlockchain = await dispatch(createMatch());

        if (createResOnBlockchain) {
            const createRes = await api.post('/match', data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (createRes && createRes.data) {
                toast.success('Successfully added a match.');
                SOCKET.emit('BET');
            }
        }
    } catch (err) {
        console.log('error in add match: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getMatch = () => async dispatch => {
    try {
        const matchRes = await api.get('/match');
        if (matchRes && matchRes.data) {
            dispatch({
                type: SET_MATCH,
                payload: matchRes.data,
            });
        }
    } catch (err) {
        console.log('error in get match', err);
    }
}

export const updateMatch = (matchId, data) => async dispatch => {
    try {
        await api.put(`/match/${matchId}`, data);
        dispatch(getMatch());
    } catch (err) {
        console.log('error in update match', err);
    }
}