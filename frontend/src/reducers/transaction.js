import { SET_EARNINGS, SET_MULTIPLIERS, SET_BET_STATUS, SET_BET_RESULT } from "../actions";

const defaultState = {
    earnings: [],
    multipliers: [],
    betStatus: [],
    betResult: [],
}

const transaction = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EARNINGS: {
            return {
                ...state,
                earnings: action.payload,
            }
        }

        case SET_MULTIPLIERS: {
            return {
                ...state,
                multipliers: action.payload,
            }
        }

        case SET_BET_STATUS: {
            return {
                ...state,
                betStatus: action.payload,
            }
        }

        case SET_BET_RESULT: {
            return {
                ...state,
                betResult: action.payload,
            }
        }

        default: {
            return state;
        }
    }
}

export default transaction;