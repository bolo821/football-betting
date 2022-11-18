import { SET_REFERRAL } from "../actions";

const defaultState = {
    count: 0,
    profit: 0,
}

const referral = (state = defaultState, action) => {
    switch (action.type) {
        case SET_REFERRAL: {
            return {
                ...state,
                count: action.payload.count,
                profit: action.payload.profit,
            }
        }

        default: {
            return state;
        }
    }
}

export default referral;