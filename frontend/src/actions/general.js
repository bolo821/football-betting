import { api, SOCKET } from "../config/apis";
import { toast } from "react-toastify";
import { SET_GENERAL } from "./type";
import { createMatch } from "./transaction";
import { setLoading } from "./flow";

export const addGeneral = data => async dispatch => {
    try {
        let createResOnBlockchain = await dispatch(createMatch());

        if (createResOnBlockchain) {
            const createRes = await api.post('/general', data);
            if (createRes && createRes.data) {
                toast.success('Successfully added a general.');
                SOCKET.emit('BET');
            }
        }
    } catch (err) {
        console.log('error in add general: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getGeneral = () => async dispatch => {
    try {
        const generalRes = await api.get('/general');
        if (generalRes && generalRes.data) {
            dispatch({
                type: SET_GENERAL,
                payload: generalRes.data,
            });
        }
    } catch (err) {
        console.log('error in get general', err);
    }
}

export const updateGeneral = (matchId, data) => async dispatch => {
    try {
        await api.put(`/general/${matchId}`, data);
        dispatch(getGeneral());
    } catch (err) {
        console.log('error in update general', err);
    }
}