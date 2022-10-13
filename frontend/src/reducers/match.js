import { SET_MATCH } from "../actions";

const defaultState = {
    matches: [],
}

const match = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MATCH: {
            return {
                ...state,
                matches: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default match;