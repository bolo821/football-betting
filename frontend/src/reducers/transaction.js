import { SET_EARNINGS, SET_MULTIPLIERS, SET_BET_STATUS, SET_BET_RESULT, SET_BET_AMOUNT, SET_TOTAL_BET, SET_CLAIM_HISTORY, SET_BET_STATS_DATA } from "../actions";

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
    totalbetsWci: [],
    claimHistory: [],
    claimHistoryWci: [],
    totalPrize: 0,
    winnerCount: 0,
    totalPrizeWci: 0,
    winnerCountWci: 0,
}

const transaction = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EARNINGS: {
            return {
                ...state,
                earnings: action.payload.eth,
                earningsWci: action.payload.wci,
            }
        }

        case SET_MULTIPLIERS: {
            return {
                ...state,
                multipliers: action.payload.eth,
                multipliersWci: action.payload.wci,
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

        case SET_BET_AMOUNT: {
            return {
                ...state,
                betAmounts: action.payload.eth,
                betAmountsWci: action.payload.wci,
            }
        }

        case SET_TOTAL_BET: {
            return {
                ...state,
                totalBets: action.payload.eth,
                totalBetsWci: action.payload.wci,
            }
        }

        case SET_CLAIM_HISTORY: {
            return {
                ...state,
                claimHistory: action.payload.eth,
                claimHistoryWci: action.payload.wci,
            }
        }

        case SET_BET_STATS_DATA: {
            return {
                ...state,
                totalPrize: action.payload.totalPrize,
                winnerCount: action.payload.winnerCount,
                totalPrizeWci: action.paload.totalPrizeWci,
                winnerCountWci: action.payload.winnerCountWci,
            }
        }

        default: {
            return state;
        }
    }
}

export default transaction;