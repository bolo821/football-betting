import { SET_GENERAL } from "../actions";

const defaultState = {
    generals: [],
}

const general = (state = defaultState, action) => {
    switch (action.type) {
        case SET_GENERAL: {
            return {
                ...state,
                generals: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default general;