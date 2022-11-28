import { SET_EVENTS } from "../actions";

const defaultState = {
    events: [],
}

const event = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EVENTS: {
            return {
                ...state,
                events: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default event;