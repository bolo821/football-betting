import { api, SOCKET } from "../config/apis";
import { toast } from "react-toastify";
import { SET_EVENTS } from "./type";
import { createMatch } from "./transaction";
import { setLoading } from "./flow";

export const addEvent = data => async dispatch => {
    try {
        let createResOnBlockchain = await dispatch(createMatch());

        if (createResOnBlockchain) {
            const createRes = await api.post('/event', data);
            if (createRes && createRes.data) {
                toast.success('Successfully added an event.');
                SOCKET.emit('BET');
            }
        }
    } catch (err) {
        console.log('error in add event: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getEvent = () => async dispatch => {
    try {
        const eventRes = await api.get('/event');
        if (eventRes && eventRes.data) {
            dispatch({
                type: SET_EVENTS,
                payload: eventRes.data,
            });
        }
    } catch (err) {
        console.log('error in get event', err);
    }
}

export const updateEvent = (matchId, data) => async dispatch => {
    try {
        await api.put(`/event/${matchId}`, data);
        dispatch(getEvent());
    } catch (err) {
        console.log('error in update event', err);
    }
}