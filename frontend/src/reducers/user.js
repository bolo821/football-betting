import {
	SET_USER_WALLET,
} from '../actions';
  
const defaultState = {
	wallet: '',
}

const user = (state = defaultState, action) => {
	switch (action.type) {
		case SET_USER_WALLET: {
			return {
				...state,
				wallet: action.payload,
			}
		}
		default:
			return state;
	}
};

export default user;
  