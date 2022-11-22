import { SET_WCI_ALLOWANCE } from "./type";
import { calculateGasMargin } from "../utils/helper";
import config from "../config";
import { setLoading } from "./";
import { toast } from "react-toastify";
import { wciContract } from "../config/apis";

export const getAllowance = account => async dispatch => {
    try {
        const allowed = await wciContract.methods.allowance(account, config.routerContractAddress).call();
        dispatch({
            type: SET_WCI_ALLOWANCE,
            payload: allowed === '0' ? false : true,
        })
    } catch (err) {
        console.log('Error in getting wci allowance: ', err);
    }
}

export const approveWci = account => async dispatch => {
    try {
        dispatch(setLoading({ loading: true, loadingText: 'Approving WCI...' }));
        const gasLimit = await wciContract.methods.approve(config.routerContractAddress, '1000000000000000000000000000000').estimateGas({ from: account });
        const approveRes = await wciContract.methods.approve(config.routerContractAddress, '1000000000000000000000000000000').send({
            from: account,
            gasLimit: calculateGasMargin(gasLimit),
        });

        if (approveRes) {
            toast.success("Successfully approved. Please try to bet with WCI now!")
            dispatch({
                type: SET_WCI_ALLOWANCE,
                payload: true,
            });
        }
    } catch (err) {
        console.log('error in wci approve: ', err);
        alert('error: ', err);
    } finally {
        dispatch(setLoading({ loading: false, loadingText: '' }));
    }
}