import { setLoading } from './';
import { toast } from 'react-toastify';
import config from '../config';
import Web3 from 'web3';
import { calculateGasMargin } from '../utils/helper';
import { SET_EARNINGS, SET_MULTIPLIERS, SET_BET_STATUS, SET_BET_RESULT, SET_BET_AMOUNT, SET_TOTAL_BET, SET_CLAIM_HISTORY, SET_BET_STATS_DATA } from './';
import { SOCKET, api } from '../config/apis';

var web3 = null;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrl));
}
const routerContract = new web3.eth.Contract(config.routerContractAbi, config.routerContractAddress);
const web3Signed = new Web3(window.ethereum);
const routerContractSigned = new web3Signed.eth.Contract(config.routerContractAbi, config.routerContractAddress);


export const bet = (account, matchId, amount, choice, callback) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Betting...' }));

    try {
        const gasLimit = await routerContractSigned.methods.bet(matchId, choice).estimateGas({ from: account, value: web3.utils.toWei(amount.toString(), 'ether') });
        const res = await routerContractSigned.methods.bet(matchId, choice)
        .send({ from: account, value: web3.utils.toWei(amount.toString(), 'ether'), gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('There was a blockchain network error. Please try again.');
            return;
        });
    
        if (res) {
            toast.success('Success!!!');
            SOCKET.emit('BET');
        }
    } catch (err) {
        if (err.message.includes('You can not bet at this time.')) {
            toast.error('You can not bet to this match anymore.');
        }
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
        callback();
    }
}

export const claim = (account, matchId) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Claiming...' }));

    try {
        const gasLimit = await routerContractSigned.methods.claim(matchId).estimateGas({ from: account });
        const res = await routerContractSigned.methods.claim(matchId)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('There was a blockchain network error. Please try again.');
            return;
        });
    
        if (res) {
            toast.success('Successfully claimed!!');
            dispatch(getEarnings(account));
            SOCKET.emit('CLAIMED');
        }
    } catch (err) {
        if (err.message.includes('You can not claim at this time.')) {
            toast.error('You can claim only after there is a match result.');
        }
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const createMatch = () => async (dispatch, useState) => {
    dispatch(setLoading({ loading: true, loadingText: 'Creating a new match...' }));

    try {
        const account = useState().user.wallet;
        if (!account) return false;

        const gasLimit = await routerContractSigned.methods.createOne().estimateGas({ from: account });
        const res = await routerContractSigned.methods.createOne()
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in create match block: ', err);
            toast.error('There was a blockchain network error. Please try again.');
            return false;
        });
    
        if (res) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        if (err.message.includes('caller is not the owner')) {
            toast.error('Only contract owner can create a new match.');
        }
        return false;
    }
}

export const getEarnings = (account) => async dispatch => {
    try {
        const res = await routerContract.methods.getClaimAmount().call({ from: account }).catch(async err => {
            await dispatch(getEarnings(account));
        });
    
        if (res) {
            let claimData = [];
            for (let i=0; i<res.length; i+=3) {
                claimData.push({
                    win: web3.utils.fromWei(res[i], 'ether'),
                    draw: web3.utils.fromWei(res[i+1], 'ether'),
                    lose: web3.utils.fromWei(res[i+2], 'ether'),
                });
            }
    
            dispatch({
                type: SET_EARNINGS,
                payload: claimData,
            });
        }
    } catch (err) {
        await dispatch(getEarnings(account));
    }
    
}

export const getBetAmount = (account) => async dispatch => {
    try {
        let amounts = await routerContract.methods.getPlayerBetAmount(account).call().catch(async () => {
            return await dispatch(getBetAmount(account));
        });

        let betAmounts = [];
        for (let i=0; i<amounts.length/3; i++) {
            betAmounts.push({
                win: web3.utils.fromWei(amounts[i*3], 'ether'),
                draw: web3.utils.fromWei(amounts[i*3+1], 'ether'),
                lose: web3.utils.fromWei(amounts[i*3+2], 'ether'),
            });
        }
        dispatch({
            type: SET_BET_AMOUNT,
            payload: betAmounts,
        });
    } catch (err) {
        return await dispatch(getBetAmount(account));
    }
}

export const getMultipliers = () => async dispatch => {
    try {
        const res = await routerContract.methods.getMultiplier().call().catch(async err => {
            await dispatch(getMultipliers());
        });
    
        if (res) {
            let multiplierData = [];
            for (let i=0; i<res.length; i+=3) {
                multiplierData.push({
                    win: parseInt(res[i]) / 1000,
                    draw: parseInt(res[i+1]) / 1000,
                    lose: parseInt(res[i+2]) / 1000,
                });
            }
    
            dispatch({
                type: SET_MULTIPLIERS,
                payload: multiplierData,
            });
        }
    } catch (err) {
        await dispatch(getMultipliers());
    }
}

export const getBetStatus = () => async dispatch => {
    try {
        const res = await routerContract.methods.getBetStatus().call().catch(async err => {
            await dispatch(getBetStatus());
        });
    
        if (res) {
            let statusData = res.map(ele => parseInt(ele));
            dispatch({
                type: SET_BET_STATUS,
                payload: statusData,
            });
        }
    } catch (err) {
        await dispatch(getBetStatus());
    }
}

export const getBetResult = () => async dispatch => {
    try {
        const res = await routerContract.methods.getBetResult().call().catch(async err => {
            await dispatch(getBetResult());
        });
    
        if (res) {
            let resultData = res.map(ele => parseInt(ele));
            dispatch({
                type: SET_BET_RESULT,
                payload: resultData,
            });
        }
    } catch (err) {
        await dispatch(getBetResult());
    }
}

export const getTotalBet = () => async dispatch => {
    try {
        let amounts = await routerContract.methods.getTotalBet().call().catch(async err => {
            return await dispatch(getTotalBet());
        });

        let totalBets = amounts.map(ele => web3.utils.fromWei(ele, 'ether'));

        dispatch({
            type: SET_TOTAL_BET,
            payload: totalBets,
        });
    } catch (err) {
        return await dispatch(getTotalBet());
    }
}

export const getClaimHistory = (account) => async dispatch => {
    try {
        const res = await routerContract.methods.getPlayerClaimHistory(account).call().catch(async () => {
            await dispatch(getClaimHistory(account));
        });
    
        if (res) {
            let resultData = res.map(ele => web3.utils.fromWei(ele, 'ether'));
            dispatch({
                type: SET_CLAIM_HISTORY,
                payload: resultData,
            });
        }
    } catch (err) {
        await dispatch(getClaimHistory(account));
    }
}

export const setBetStatus = (account, matchId, status, callback) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Setting match status...' }));

    try {
        const gasLimit = await routerContractSigned.methods.setBetStatus(matchId, status).estimateGas({ from: account });
        const res = await routerContractSigned.methods.setBetStatus(matchId, status)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('There was a blockchain network error. Please try again.');
            return;
        });
    
        if (res) {
            toast.success('Successfully set the bet status.');
            SOCKET.emit('BET');
        }
    } catch (err) {
        console.log('error: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
        callback();
    }
}

export const setBetResult = (account, data, callback) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Setting match result...' }));

    try {
        const { matchId, result, team1Score, team2Score } = data;

        const gasLimit = await routerContractSigned.methods.setBetResult(matchId, result).estimateGas({ from: account });
        const res = await routerContractSigned.methods.setBetResult(matchId, result)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('There was a blockchain network error. Please try again.');
            return;
        });
    
        if (res) {
            await api.put(`/match/${matchId}`, { team1Score, team2Score });
            SOCKET.emit('BET');
        }
    } catch (err) {
        console.log('error: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
        callback();
    }
}

export const withdrawMatchProfit = (account, matchId) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Withdrawing a match profit...' }));

    try {
        const gasLimit = await routerContractSigned.methods.withdrawProfitFromPair(matchId).estimateGas({ from: account });
        const res = await routerContractSigned.methods.withdrawProfitFromPair(matchId)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('There was a blockchain network error. Please try again.');
            return;
        });
    
        if (res) {
            toast.success('Successfully withdrew the match profit.');
            SOCKET.emit('BET');
        }
    } catch (err) {
        if (err.message.includes("No profit to withdraw")) {
            toast.error("No profit to withdraw.");
        }
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getBetStatsData = () => async dispatch => {
    try {
        const res = await routerContract.methods.getBetStatsData().call().catch(async () => {
            await dispatch(getBetStatsData());
        });
    
        if (res) {
            dispatch({
                type: SET_BET_STATS_DATA,
                payload: {
                    totalPrize: web3.utils.fromWei(res[0], 'ether'),
                    winnerCount: res[1],
                }
            });
        }
    } catch (err) {
        await dispatch(getBetStatsData());
    }
}