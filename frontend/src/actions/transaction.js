import { setLoading } from './';
import { toast } from 'react-toastify';
import config from '../config';
import Web3 from 'web3';
import { calculateGasMargin } from '../utils/helper';
import { SET_EARNINGS, SET_MULTIPLIERS, SET_BET_STATUS, SET_BET_RESULT } from './';
import { SOCKET } from '../config/api';

export const web3 = new Web3(window.ethereum);
const routerContract = new web3.eth.Contract(config.routerContractAbi, config.routerContractAddress);


export const bet = (contract, account, matchId, amount, choice, callback) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Betting...' }));

    try {
        const gasLimit = await routerContract.methods.bet(matchId, choice).estimateGas({ from: account, value: web3.utils.toWei(amount.toString(), 'ether') });
        const res = await routerContract.methods.bet(matchId, choice)
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

export const claim = (contract, account, matchId) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Claiming...' }));

    try {
        const gasLimit = await contract.methods.claim(matchId).estimateGas({ from: account });
        const res = await contract.methods.claim(matchId)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('There was a blockchain network error. Please try again.');
            return;
        });
    
        if (res) {
            toast.success('Successfully claimed!!');
        }
    } catch (err) {
        if (err.message.includes('You can not claim at this time.')) {
            toast.error('You can claim only after there is a match result.');
        }
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getEarnings = (contract, account) => async dispatch => {
    const res = await routerContract.methods.getClaimAmount().call({ from: account }).catch(async err => {
        await dispatch(getEarnings(routerContract, account));
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
}

export const getMultipliers = (contract) => async dispatch => {
    const res = await routerContract.methods.getMultiplier().call().catch(async err => {
        await dispatch(getMultipliers(routerContract));
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
}

export const getBetStatus = (contract) => async dispatch => {
    const res = await routerContract.methods.getBetStatus().call().catch(async err => {
        await dispatch(getBetStatus(routerContract));
    });

    if (res) {
        let statusData = res.map(ele => parseInt(ele));
        dispatch({
            type: SET_BET_STATUS,
            payload: statusData,
        });
    }
}

export const getBetResult = (contract) => async dispatch => {
    const res = await routerContract.methods.getBetResult().call().catch(async err => {
        await dispatch(getBetResult(routerContract));
    });

    if (res) {
        let resultData = res.map(ele => parseInt(ele));
        dispatch({
            type: SET_BET_RESULT,
            payload: resultData,
        });
    }
}