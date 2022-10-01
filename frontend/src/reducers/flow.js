import { SET_LOADING } from "../actions/type";

const defaultState = {
    loading: false,
    loadingText: '',
}

const flow = (state=defaultState, action) => {
    switch (action.type) {
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload.loading,
                loadingText: action.payload.loadingText,
            }
        }
        default: {
            return state;
        }
    }
}

export default flow;