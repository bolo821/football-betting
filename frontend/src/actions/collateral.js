import { web3, routerContract, usdtContract, usdcContract, shibContract, dogeContract, routerContractSigned } from '../config/apis';
import { SET_COLLATERALS, SET_USDT_ALLOWANCE, SET_USDC_ALLOWANCE, SET_SHIB_ALLOWANCE, SET_DOGE_ALLOWANCE } from './type';
import config from '../config';
import { setLoading } from "./";
import { toast } from "react-toastify";
import { calculateGasMargin } from '../utils/helper';

const allowAmount = '10000000000000000000000000000000000000000';

export const getCollaterals = (account) => async dispatch => {
    try {
        const res = await routerContract.methods.getUserLPBalance(account).call();

        dispatch({
            type: SET_COLLATERALS,
            payload: {
                eth: web3.utils.fromWei(res[0], 'ether'),
                usdt: web3.utils.fromWei(res[1], 'mwei'),
                usdc: web3.utils.fromWei(res[2], 'mwei'),
                shib: web3.utils.fromWei(res[3], 'ether'),
                doge: web3.utils.fromWei(res[4], 'gwei') * 10,
            }
        })
    } catch (err) {
        console.log('error in get collaterals: ', err);
    }
}

export const depositEth = (account, amount) => async dispatch => {
    try {
        dispatch(setLoading({ loading: true, loadingText: 'Depositing ETH...' }));
        const gasLimit = await routerContractSigned.methods.depositEth().estimateGas({ from: account, value: web3.utils.toWei(amount, 'ether') });
        await routerContractSigned.methods.depositEth().send({
            from: account,
            value: web3.utils.toWei(amount, 'ether'),
            gasLimit: calculateGasMargin(gasLimit),
        });

        toast.success("Successfully deposited.");
        dispatch(getCollaterals(account));
    } catch (err) {
        console.log('error in deposit eth: ', err);
        toast.error('Transaction reverted.');
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const depositTokens = (account, amount, token) => async dispatch => {
    try {
        let amountWithDecimal;
        let loadingText = '';
        if (token === 1) {
            amountWithDecimal = web3.utils.toWei(amount, 'mwei');
            loadingText = 'Depositing USDT...';
        } else if (token === 2) {
            amountWithDecimal = web3.utils.toWei(amount, 'mwei');
            loadingText = 'Depositing USDC...';
        } else if (token === 3) {
            amountWithDecimal = web3.utils.toWei(amount, 'ether');
            loadingText = 'Depositing SHIB...';
        } else if (token === 4) {
            amountWithDecimal = web3.utils.toWei(amount, 'mwei') * 100;
            loadingText = 'Depositing DOGE...';
        }

        dispatch(setLoading({ loading: true, loadingText: loadingText }));
        const gasLimit = await routerContractSigned.methods.depositErc20(token, amountWithDecimal).estimateGas({ from: account });
        await routerContractSigned.methods.depositErc20(token, amountWithDecimal).send({
            from: account,
            gasLimit: calculateGasMargin(gasLimit),
        });

        toast.success("Successfully deposited.");
        dispatch(getCollaterals(account));
    } catch (err) {
        console.log('error in deposit eth: ', err);
        toast.error('Transaction reverted.');
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const withdrawTokens = (account, amount, token) => async dispatch => {
    try {
        let amountWithDecimal;
        let loadingText = '';
        if (token === 0) {
            amountWithDecimal = web3.utils.toWei(amount, 'ether');
            loadingText = 'Withdrawing ETH...';
        } else if (token === 1) {
            amountWithDecimal = web3.utils.toWei(amount, 'mwei');
            loadingText = 'Withdrawing USDT...';
        } else if (token === 2) {
            amountWithDecimal = web3.utils.toWei(amount, 'mwei');
            loadingText = 'Withdrawing USDC...';
        } else if (token === 3) {
            amountWithDecimal = web3.utils.toWei(amount, 'ether');
            loadingText = 'Withdrawing SHIB...';
        } else if (token === 4) {
            amountWithDecimal = web3.utils.toWei(amount, 'mwei') * 100;
            loadingText = 'Withdrawing DOGE...';
        }

        dispatch(setLoading({ loading: true, loadingText: loadingText }));
        const gasLimit = await routerContractSigned.methods.withdraw(token, amountWithDecimal).estimateGas({ from: account });
        await routerContractSigned.methods.withdraw(token, amountWithDecimal).send({
            from: account,
            gasLimit: calculateGasMargin(gasLimit),
        });

        toast.success("Successfully withdrew.");
        dispatch(getCollaterals(account));
    } catch (err) {
        console.log('error in withdraw tokens: ', err);
        toast.error('Transaction reverted.');
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getUSDTAllowance = account => async dispatch => {
    try {
        const allowed = await usdtContract.methods.allowance(account, config.routerContractAddress).call().catch(err => {
            console.log('error in getting usdt allowance block: ', err);
        })
        dispatch({
            type: SET_USDT_ALLOWANCE,
            payload: parseInt(web3.utils.fromWei(allowed, 'mwei')),
        })
    } catch (err) {
        console.log('Error in getting usdt allowance: ', err);
    }
}

export const approveUsdt = account => async dispatch => {
    try {
        dispatch(setLoading({ loading: true, loadingText: 'Approving USDT...' }));
        const gasLimit = await usdtContract.methods.approve(config.routerContractAddress, allowAmount).estimateGas({ from: account });
        const approveRes = await usdtContract.methods.approve(config.routerContractAddress, allowAmount).send({
            from: account,
            gasLimit: calculateGasMargin(gasLimit),
        });

        if (approveRes) {
            toast.success("Successfully approved. Please deposit USDT!")
            dispatch({
                type: SET_USDT_ALLOWANCE,
                payload: parseInt(web3.utils.fromWei(allowAmount, 'mwei')),
            });
        }
    } catch (err) {
        console.log('error in usdt approve: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getUSDCAllowance = account => async dispatch => {
    try {
        const allowed = await usdcContract.methods.allowance(account, config.routerContractAddress).call();
        dispatch({
            type: SET_USDC_ALLOWANCE,
            payload: parseInt(web3.utils.fromWei(allowed, 'mwei')),
        })
    } catch (err) {
        console.log('Error in getting usdc allowance: ', err);
    }
}

export const approveUsdc = account => async dispatch => {
    try {
        dispatch(setLoading({ loading: true, loadingText: 'Approving USDC...' }));
        const gasLimit = await usdcContract.methods.approve(config.routerContractAddress, allowAmount).estimateGas({ from: account });
        const approveRes = await usdcContract.methods.approve(config.routerContractAddress, allowAmount).send({
            from: account,
            gasLimit: calculateGasMargin(gasLimit),
        });

        if (approveRes) {
            toast.success("Successfully approved. Please deposit USDC!")
            dispatch({
                type: SET_USDC_ALLOWANCE,
                payload: parseInt(web3.utils.fromWei(allowAmount, 'mwei')),
            });
        }
    } catch (err) {
        console.log('error in usdc approve: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getSHIBAllowance = account => async dispatch => {
    try {
        const allowed = await shibContract.methods.allowance(account, config.routerContractAddress).call();
        dispatch({
            type: SET_SHIB_ALLOWANCE,
            payload: parseInt(web3.utils.fromWei(allowed, 'ether')),
        })
    } catch (err) {
        console.log('Error in getting shib allowance: ', err);
    }
}

export const approveShib = account => async dispatch => {
    try {
        dispatch(setLoading({ loading: true, loadingText: 'Approving SHIB...' }));
        const gasLimit = await shibContract.methods.approve(config.routerContractAddress, allowAmount).estimateGas({ from: account });
        const approveRes = await shibContract.methods.approve(config.routerContractAddress, allowAmount).send({
            from: account,
            gasLimit: calculateGasMargin(gasLimit),
        });

        if (approveRes) {
            toast.success("Successfully approved. Please deposit SHIB!")
            dispatch({
                type: SET_SHIB_ALLOWANCE,
                payload: parseInt(web3.utils.fromWei(allowAmount, 'ether') * 10),
            });
        }
    } catch (err) {
        console.log('error in shib approve: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}

export const getDOGEAllowance = account => async dispatch => {
    try {
        const allowed = await dogeContract.methods.allowance(account, config.routerContractAddress).call();
        dispatch({
            type: SET_DOGE_ALLOWANCE,
            payload: parseInt(web3.utils.fromWei(allowed, 'gwei') * 10),
        })
    } catch (err) {
        console.log('Error in getting doge allowance: ', err);
    }
}

export const approveDoge = account => async dispatch => {
    try {
        dispatch(setLoading({ loading: true, loadingText: 'Approving DOGE...' }));
        const gasLimit = await dogeContract.methods.approve(config.routerContractAddress, allowAmount).estimateGas({ from: account });
        const approveRes = await dogeContract.methods.approve(config.routerContractAddress, allowAmount).send({
            from: account,
            gasLimit: calculateGasMargin(gasLimit),
        });

        if (approveRes) {
            toast.success("Successfully approved. Please deposit DOGE!")
            dispatch({
                type: SET_DOGE_ALLOWANCE,
                payload: parseInt(web3.utils.fromWei(allowAmount, 'gwei') * 10),
            });
        }
    } catch (err) {
        console.log('error in doge approve: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}