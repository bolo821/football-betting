import { SET_EARNINGS } from "../actions";

const defaultState = {
    earnings: [],
}

const transaction = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EARNINGS: {
            return {
                ...state,
                earnings: action.payload,
            }
        }

        default: {
            return state;
        }
    }
}

export default transaction;