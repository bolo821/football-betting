import { SET_LEADERBOARD } from "../actions";

const defaultState = {
    leaderboard: [],
}

const leaderboard = (state = defaultState, action) => {
    switch (action.type) {
        case SET_LEADERBOARD: {
            return {
                ...state,
                leaderboard: action.payload,
            }
        }

        default: {
            return state;
        }
    }
}

export default leaderboard;