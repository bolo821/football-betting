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


export const bet = (account, matchId, amount, choice, token, callback) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Betting...' }));

    try {
        if (token === "ETH") {
            const gasLimit = await routerContractSigned.methods.betEther(matchId, choice).estimateGas({ from: account, value: web3.utils.toWei(amount.toString(), 'ether') });
            const res = await routerContractSigned.methods.betEther(matchId, choice)
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
        } else if (token === "WCI") {
            const gasLimit = await routerContractSigned.methods.betWCI(matchId, web3.utils.toWei(amount.toString(), 'gwei'), choice).estimateGas({ from: account });
            const res = await routerContractSigned.methods.betWCI(matchId, web3.utils.toWei(amount.toString(), 'gwei'), choice)
            .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
            .catch(err => {
                console.log('error in bet block: ', err);
                toast.error('There was a blockchain network error. Please try again.');
                return;
            });
        
            if (res) {
                toast.success('Success!!!');
                SOCKET.emit('BET');
            }
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

export const claim = (account, matchId, token) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Claiming...' }));

    let tokenParam = token === 'ETH' ? 0 : 1;

    try {
        const gasLimit = await routerContractSigned.methods.claim(matchId, tokenParam).estimateGas({ from: account });
        const res = await routerContractSigned.methods.claim(matchId, tokenParam)
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

export const getBetAmount = (account) => async dispatch => {
    try {
        let amountRes = await routerContract.methods.getPlayerBetAmount(account).call().catch(async () => {
            return await dispatch(getBetAmount(account));
        });

        let amounts = amountRes[0];
        let amountsWci = amountRes[1];
        let betAmounts = [];
        let betAmountsWci = [];

        for (let i=0; i<amounts.length/3; i++) {
            betAmounts.push({
                win: web3.utils.fromWei(amounts[i*3], 'ether'),
                draw: web3.utils.fromWei(amounts[i*3+1], 'ether'),
                lose: web3.utils.fromWei(amounts[i*3+2], 'ether'),
            });
            betAmountsWci.push({
                win: web3.utils.fromWei(amountsWci[i*3], 'gwei'),
                draw: web3.utils.fromWei(amountsWci[i*3+1], 'gwei'),
                lose: web3.utils.fromWei(amountsWci[i*3+2], 'gwei'),
            });
        }
        dispatch({
            type: SET_BET_AMOUNT,
            payload: {
                eth: betAmounts,
                wci: betAmountsWci,
            },
        });
    } catch (err) {
        return await dispatch(getBetAmount(account));
    }
}

export const getEarnings = (account) => async dispatch => {
    try {
        const earningRes = await routerContract.methods.getClaimAmount().call({ from: account }).catch(async err => {
            await dispatch(getEarnings(account));
        });
    
        if (earningRes) {
            let res = earningRes[0];
            let resWci = earningRes[1];
            let claimData = [];
            let claimDataWci = [];

            for (let i=0; i<res.length; i+=3) {
                claimData.push({
                    win: web3.utils.fromWei(res[i], 'ether'),
                    draw: web3.utils.fromWei(res[i+1], 'ether'),
                    lose: web3.utils.fromWei(res[i+2], 'ether'),
                });
                claimDataWci.push({
                    win: web3.utils.fromWei(resWci[i], 'gwei'),
                    draw: web3.utils.fromWei(resWci[i+1], 'gwei'),
                    lose: web3.utils.fromWei(resWci[i+2], 'gwei'),
                });
            }
    
            dispatch({
                type: SET_EARNINGS,
                payload: {
                    eth: claimData,
                    wci: claimDataWci,
                },
            });
        }
    } catch (err) {
        await dispatch(getEarnings(account));
    }
    
}

export const getMultipliers = () => async dispatch => {
    try {
        const mulRes = await routerContract.methods.getMultiplier().call().catch(async err => {
            await dispatch(getMultipliers());
        });
    
        if (mulRes) {
            let res = mulRes[0];
            let resWci = mulRes[1];
            let multiplierData = [];
            let multiplierDataWci = [];
            
            for (let i=0; i<res.length; i+=3) {
                multiplierData.push({
                    win: parseInt(res[i]) / 1000,
                    draw: parseInt(res[i+1]) / 1000,
                    lose: parseInt(res[i+2]) / 1000,
                });
                multiplierDataWci.push({
                    win: parseInt(resWci[i]) / 1000 < 1 ? 1 : parseInt(resWci[i]) / 1000,
                    draw: parseInt(resWci[i+1]) / 1000 < 1 ? 1 : parseInt(resWci[i+1]) / 1000,
                    lose: parseInt(resWci[i+2]) / 1000 < 1 ? 1 : parseInt(resWci[i+2]) / 1000,
                });
            }
    
            dispatch({
                type: SET_MULTIPLIERS,
                payload: {
                    eth: multiplierData,
                    wci: multiplierDataWci,
                },
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
        let totalRes = await routerContract.methods.getTotalBet().call().catch(async err => {
            return await dispatch(getTotalBet());
        });

        let amounts = totalRes[0];
        let amountsWci = totalRes[1];
        let totalBets = amounts.map(ele => web3.utils.fromWei(ele, 'ether'));
        let totalBetsWci = amountsWci.map(ele => web3.utils.fromWei(ele, 'gwei'));

        dispatch({
            type: SET_TOTAL_BET,
            payload: {
                eth: totalBets,
                wci: totalBetsWci,
            },
        });
    } catch (err) {
        return await dispatch(getTotalBet());
    }
}

export const getClaimHistory = (account) => async dispatch => {
    try {
        const claimRes = await routerContract.methods.getPlayerClaimHistory(account).call().catch(async () => {
            await dispatch(getClaimHistory(account));
        });
    
        if (claimRes) {
            let res = claimRes[0];
            let resWci = claimRes[1];
            let resultData = res.map(ele => web3.utils.fromWei(ele, 'ether'));
            let resultDataWci = resWci.map(ele => web3.utils.fromWei(ele, 'gwei'));

            dispatch({
                type: SET_CLAIM_HISTORY,
                payload: {
                    eth: resultData,
                    wci: resultDataWci,
                },
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
            toast.success('Successfully set the bet result.');
            SOCKET.emit('BET');
        }
    } catch (err) {
        console.log('error: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
        callback();
    }
}

export const getBetStatsData = () => async dispatch => {
    try {
        const statsRes = await routerContract.methods.getBetStatsData().call().catch(async () => {
            await dispatch(getBetStatsData());
        });
    
        if (statsRes) {
            let res = statsRes[0];
            let resWci = statsRes[1];

            dispatch({
                type: SET_BET_STATS_DATA,
                payload: {
                    totalPrize: web3.utils.fromWei(res[0], 'ether'),
                    winnerCount: res[1],
                    totalPrizeWci: web3.utils.fromWei(resWci[0], 'gwei'),
                    winnerCountWci: resWci[1],
                }
            });
        }
    } catch (err) {
        await dispatch(getBetStatsData());
    }
}