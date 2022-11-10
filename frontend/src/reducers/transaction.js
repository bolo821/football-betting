import {
    SET_BET_STATS_DATA,
    SET_TRIPLE_INFORMATION,
    SET_SINGLE_INFORMATION,
} from "../actions";

const defaultState = {
    earnings: [],
    earningsWci: [],
    multipliers: [],
    multipliersWci: [],
    betStatus: [],
    betResult: [],
    betAmounts: [],
    betAmountsWci: [],
    totalBets: [],
    totalBetsWci: [],
    claimHistory: [],
    claimHistoryWci: [],
    totalPrize: 0,
    winnerCount: 0,
    totalPrizeWci: 0,
    winnerCountWci: 0,
}

const transaction = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TRIPLE_INFORMATION: {
            if (action.payload.token === 0) {
                return {
                    ...state,
                    betAmounts: action.payload.betAmounts,
                    multipliers: action.payload.multipliers,
                    earnings: action.payload.earnings,
                }
            } else {
                return {
                    ...state,
                    betAmountsWci: action.payload.betAmounts,
                    multipliersWci: action.payload.multipliers,
                    earningsWci: action.payload.earnings,
                }
            }
        }
        case SET_SINGLE_INFORMATION: {
            if (action.payload.token === 0) {
                return {
                    ...state,
                    betStatus: action.payload.betStatus,
                    betResult: action.payload.betResult,
                    claimHistory: action.payload.claimHistory,
                    totalBets: action.payload.totalBet,
                }
            } else {
                return {
                    ...state,
                    betStatus: action.payload.betStatus,
                    betResult: action.payload.betResult,
                    claimHistoryWci: action.payload.claimHistory,
                    totalBetsWci: action.payload.totalBet,
                }
            }
        }

        case SET_BET_STATS_DATA: {
            return {
                ...state,
                totalPrize: action.payload.totalPrize,
                winnerCount: action.payload.winnerCount,   
                totalPrizeWci: action.payload.totalPrizeWci,
                winnerCountWci: action.payload.winnerCountWci, 
            }
        }

        default: {
            return state;
        }
    }
}

export default transaction;