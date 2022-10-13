import { api } from "../config/apis";
import { toast } from "react-toastify";
import { SET_MATCH } from "./type";
import { createMatch } from "./transaction";
import { setLoading } from "./flow";

export const addMatch = data => async dispatch => {
    try {
        // let createResOnBlockchain = await dispatch(createMatch());
        let createResOnBlockchain = true;

        if (createResOnBlockchain) {
            const createRes = await api.post('/match', data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (createRes && createRes.data) {
                toast.success('Successfully added a match.');
            }
        } else {
            toast.error('There occurred an error while creating a new match on blockchain.');
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