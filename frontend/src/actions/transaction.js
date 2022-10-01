import { setLoading } from './';
import { toast } from 'react-toastify';
import config from '../config';
import Web3 from 'web3';
import { calculateGasMargin } from '../utils/helper';

export const web3 = new Web3(config.rpcUrl);

export const bet = (contract, account, matchId, amount, choice) => async dispatch => {
    dispatch(setLoading({ loading: true, loadingText: 'Betting...' }));

    const gasLimit = await contract.methods.bet(matchId, choice).estimateGas({ from: account, value: web3.utils.toWei(amount.toString(), 'ether') });
    const res = await contract.methods.bet(matchId, choice)
    .send({ from: account, value: web3.utils.toWei(amount.toString(), 'ether'), gasLimit: calculateGasMargin(gasLimit) })
    .catch(err => {
        console.log('error in bet block: ', err);
        toast.error('There was a blockchain network error. Please try again.');
        dispatch(setLoading({ loading: false, loadingText: '' }));
        return;
    });

    if (res) {
        dispatch(setLoading({ loading: false, loadingText: '' }));
        toast.success('Success!!!');
    }
}