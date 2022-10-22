import { SET_WCI_ALLOWANCE } from "../actions";

const defaultState = {
    allowed: false,
}

const wci = (state = defaultState, action) => {
    switch (action.type) {
        case SET_WCI_ALLOWANCE: {
            return {
                ...state,
                allowed: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default wci;