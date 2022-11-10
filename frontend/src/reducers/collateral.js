import { SET_COLLATERALS, SET_USDT_ALLOWANCE, SET_USDC_ALLOWANCE, SET_SHIB_ALLOWANCE, SET_DOGE_ALLOWANCE } from "../actions";

const initState = {
    eth: 0,
    usdt: 0,
    usdc: 0,
    shib: 0,
    doge: 0,
    usdtAllowance: 0,
    usdcAllowance: 0,
    shibAllowance: 0,
    dogeAllowance: 0,
}

const collateral = (state = initState, action) => {
    switch (action.type) {
        case SET_COLLATERALS: {
            return {
                ...state,
                eth: action.payload.eth,
                usdt: action.payload.usdt,
                usdc: action.payload.usdc,
                shib: action.payload.shib,
                doge: action.payload.doge,
            }
        }

        case SET_USDT_ALLOWANCE: {
            return {
                ...state,
                usdtAllowance: action.payload,
            }
        }

        case SET_USDC_ALLOWANCE: {
            return {
                ...state,
                usdcAllowance: action.payload,
            }
        }

        case SET_SHIB_ALLOWANCE: {
            return {
                ...state,
                shibAllowance: action.payload,
            }
        }

        case SET_DOGE_ALLOWANCE: {
            return {
                ...state,
                dogeAllowance: action.payload,
            }
        }

        default: {
            return state;
        }
    }
}

export default collateral;