import { setLoading } from './';
import { toast } from 'react-toastify';
import { calculateGasMargin } from '../utils/helper';
import {
    updateLeaderboard,
    SET_BET_STATS_DATA,
    SET_TRIPLE_INFORMATION,
    SET_SINGLE_INFORMATION,
} from './';
import { SOCKET, api, web3, routerContract, routerContractSigned } from '../config/apis';

export const bet = (account, matchId, amount, multiplier, choice, token, callback) => async (dispatch, getState) => {
    dispatch(setLoading({ loading: true, loadingText: 'Betting...' }));

    const leaderboards = getState().leaderboard.leaderboard;
    let oldLeaderboardData = null;
    
    for (let i=0; i<leaderboards.length; i++) {
        if (leaderboards[i].account === account) {
            oldLeaderboardData = leaderboards[i];
        }
    }

    try {
        if (token === "ETH") {
            const gasLimit = await routerContractSigned.methods.betEther(matchId, choice, multiplier).estimateGas({ from: account, value: web3.utils.toWei(amount.toString(), 'ether') });
            const res = await routerContractSigned.methods.betEther(matchId, choice, multiplier)
            .send({ from: account, value: web3.utils.toWei(amount.toString(), 'ether'), gasLimit: calculateGasMargin(gasLimit) })
            .catch(err => {
                console.log('error in bet block: ', err);
                toast.error('Transaction reverted.');
                return;
            });
        
            if (res) {
                await dispatch(updateLeaderboard(account, { totalBet: parseFloat(oldLeaderboardData.totalBet) + parseFloat(amount) }));
                toast.success('Success!!!');
                SOCKET.emit('BET');
            }
        } else if (token === "WCI") {
            const gasLimit = await routerContractSigned.methods.betWCI(matchId, web3.utils.toWei(amount.toString(), 'gwei'), choice).estimateGas({ from: account });
            const res = await routerContractSigned.methods.betWCI(matchId, web3.utils.toWei(amount.toString(), 'gwei'), choice)
            .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
            .catch(err => {
                console.log('error in bet block: ', err);
                toast.error('Transaction reverted.');
                return;
            });
        
            if (res) {
                await dispatch(updateLeaderboard(account, { totalBetWci: parseFloat(oldLeaderboardData.totalBetWci) + parseFloat(amount)*19/20 }));
                toast.success('Success!!!');
                SOCKET.emit('BET');
            }
        }
    } catch (err) {
        console.log('error in bet: ', err);
        if (err.message.includes('You can not bet at this time.')) {
            toast.error('You can not bet to this match anymore.');
        } else if (err.message.includes("You don't have enough collaterals for that multiplier.")) {
            toast.error("You don't have enough collaterals for that multiplier.");
        } else {
            toast.error('Transaction reverted.');
        }
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
        callback();
    }
}

export const claim = (account, matchId, token) => async (dispatch, getState) => {
    dispatch(setLoading({ loading: true, loadingText: 'Claiming...' }));

    const leaderboards = getState().leaderboard.leaderboard;
    let oldLeaderboardData = null;
    
    for (let i=0; i<leaderboards.length; i++) {
        if (leaderboards[i].account === account) {
            oldLeaderboardData = leaderboards[i];
        }
    }

    const betResult = getState().transaction.betResult[matchId];
    let choice = betResult === 0 ? 'win' : betResult === 1 ? 'draw' : 'lose';
    const claimAmount = getState().transaction.earnings[matchId][choice];
    const claimAmountWci = getState().transaction.earningsWci[matchId][choice];

    let tokenParam = token === 'ETH' ? 0 : 1;

    try {
        const gasLimit = await routerContractSigned.methods.claim(matchId, tokenParam).estimateGas({ from: account });
        const res = await routerContractSigned.methods.claim(matchId, tokenParam)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('Transaction reverted.');
            return;
        });
    
        if (res) {
            if (oldLeaderboardData) {
                if (tokenParam === 0) {
                    await dispatch(updateLeaderboard(account, { totalClaim: parseFloat(oldLeaderboardData.totalClaim) + parseFloat(claimAmount) }));
                } else {
                    await dispatch(updateLeaderboard(account, { totalClaimWci: parseFloat(oldLeaderboardData.totalClaimWci) + parseFloat(claimAmountWci) }));
                }
            }
            
            toast.success('Successfully claimed!!');
            dispatch(getSingleInformation(account, tokenParam));
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
            return false;
        });
    
        if (res) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        toast.error('Transaction reverted.');
        return false;
    }
}

export const getTripleInformation = (account, token) => async dispatch => {
    try {
        let res = await routerContract.methods.getBetTripleInformation(account, token).call();
        let matchCount = res.length / 9;

        let betAmounts = [];
        let multipliers = [];
        let earnings = [];

        for (let i=0; i<matchCount*3; i+=3) {
            if (token === 0) {
                betAmounts.push({
                    win: web3.utils.fromWei(res[i], 'ether'),
                    draw: web3.utils.fromWei(res[i+1], 'ether'),
                    lose: web3.utils.fromWei(res[i+2], 'ether'),
                });
            } else {
                betAmounts.push({
                    win: web3.utils.fromWei(res[i], 'gwei'),
                    draw: web3.utils.fromWei(res[i+1], 'gwei'),
                    lose: web3.utils.fromWei(res[i+2], 'gwei'),
                })
            }
        }

        for (let i=matchCount*3; i<matchCount*6; i+=3) {
            if (token === 0) {
                multipliers.push({
                    win: parseInt(res[i]) / 1000,
                    draw: parseInt(res[i+1]) / 1000,
                    lose: parseInt(res[i+2]) / 1000,
                });
            } else {
                multipliers.push({
                    win: parseInt(res[i]) / 1000 < 1 ? 1 : parseInt(res[i]) / 1000,
                    draw: parseInt(res[i+1]) / 1000 < 1 ? 1 : parseInt(res[i+1]) / 1000,
                    lose: parseInt(res[i+2]) / 1000 < 1 ? 1 : parseInt(res[i+2]) / 1000,
                });
            }
        }

        for (let i=matchCount*6; i<matchCount*9; i+=3) {
            if (token === 0) {
                earnings.push({
                    win: web3.utils.fromWei(res[i], 'ether'),
                    draw: web3.utils.fromWei(res[i+1], 'ether'),
                    lose: web3.utils.fromWei(res[i+2], 'ether'),
                });
            } else {
                earnings.push({
                    win: web3.utils.fromWei(res[i], 'gwei'),
                    draw: web3.utils.fromWei(res[i+1], 'gwei'),
                    lose: web3.utils.fromWei(res[i+2], 'gwei'),
                });
            }
        }

        dispatch({
            type: SET_TRIPLE_INFORMATION,
            payload: {
                token,
                betAmounts,
                multipliers,
                earnings,
            }
        });
    } catch (err) {
        console.log('error in get triple information: ', err);
    }
}

export const getSingleInformation = (account, token) => async dispatch => {
    try {
        let res = await routerContract.methods.getBetSingleInformation(account, token).call();
        let matchCount = res.length / 4;

        let claimHistory = [];
        let betStatus = [];
        let betResult = [];
        let totalBet = [];

        for (let i=0; i<matchCount; i++) {
            betStatus.push(parseInt(res[i]));
            betResult.push(parseInt(res[matchCount + i]));

            if (token === 0) {
                claimHistory.push(web3.utils.fromWei(res[matchCount*2 + i], 'ether'));
                totalBet.push(web3.utils.fromWei(res[matchCount*3 + i], 'ether'));
            }
            else {
                claimHistory.push(web3.utils.fromWei(res[matchCount*2 + i], 'gwei'));
                totalBet.push(web3.utils.fromWei(res[matchCount*3 + i], 'gwei'));
            }
        }

        dispatch({
            type: SET_SINGLE_INFORMATION,
            payload: {
                token,
                claimHistory,
                betStatus,
                betResult,
                totalBet,
            }
        });
    } catch (err) {
        console.log('error in get single information: ', err);
    }
}

export const getBetStatsData = () => async dispatch => {
    try {
        const res = await routerContract.methods.getBetStatsData().call();
    
        dispatch({
            type: SET_BET_STATS_DATA,
            payload: {
                totalPrize: web3.utils.fromWei(res[0], 'ether'),
                winnerCount: res[1],
                totalPrizeWci: web3.utils.fromWei(res[2], 'gwei'),
                winnerCountWci: res[3],
            }
        });
    } catch (err) {
        console.log('error in get bet stats data: ', err);
    }
}


export const setBetStatus = (account, matchId, status, type, callback) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Setting match status...' }));

    try {
        const gasLimit = await routerContractSigned.methods.setBetStatus(matchId, status).estimateGas({ from: account });
        const res = await routerContractSigned.methods.setBetStatus(matchId, status)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('Transaction reverted.');
            return;
        });
    
        if (res) {
            await api.put(`/${type}/${matchId}`, { matchStatus: status });
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
        const { matchId, result, team1Score, team2Score, matchType } = data;

        const gasLimit = await routerContractSigned.methods.setBetResult(matchId, result).estimateGas({ from: account });
        const res = await routerContractSigned.methods.setBetResult(matchId, result)
        .send({ from: account, gasLimit: calculateGasMargin(gasLimit) })
        .catch(err => {
            console.log('error in bet block: ', err);
            toast.error('Transaction reverted.');
            return;
        });
    
        if (res) {
            if (matchType === 'match')
                await api.put(`/match/${matchId}`, { team1Score, team2Score, matchStatus: 2 });
            else 
                await api.put(`/${matchType}/${matchId}`, { matchStatus: 2 });

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