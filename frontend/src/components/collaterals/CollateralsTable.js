import React, { useState } from 'react';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

var token = 0;
var deposit = () => {};
var withdraw = () => {};

const CollateralsTable = props => {
    const { data } = props;
    const [amount, setAmount] = useState('');
    const [showDModal, setShowDModal] = useState(false);
    const [showWModal, setShowWModal] = useState(false);

    const handleDeposit = (ele, index) => {
        token = index;
        deposit = (amount) => {
            ele.handleDeposit(amount);
        }
        setShowDModal(true);
    }

    const handleWithdraw = (ele, index) => {
        token = index;
        withdraw = (amount) => {
            ele.handleWithdraw(amount);
        }
        setShowWModal(true);
    }

    return (
        <div className="container">
            { data.length > 0 ?
                <div className="table-responsive">
                    <table className="table history-table-rt">
                        <thead>
                            <tr>
                                <th scope="col">Crypto</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Deposit</th>
                                <th scope="col">Withdraw</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.map((ele, index) => (
                                <tr key={index}>
                                    <td>{ele.crypto}</td>
                                    <td>{parseInt(ele.amount)}</td>
                                    <td>
                                        { index !== 0 && ele.allowance === 0 ?
                                            <button
                                                type="button"
                                                className="cmn-btn reg set-bn-rt"
                                                onClick={ele.handleApprove}
                                            >
                                                Approve
                                            </button> :
                                            <button
                                                type="button"
                                                className="cmn-btn reg set-bn-rt"
                                                onClick={() => {handleDeposit(ele, index)}}
                                            >
                                                Deposit
                                            </button>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="cmn-btn reg set-bn-rt"
                                            onClick={() => {handleWithdraw(ele, index)}}
                                        >
                                            Withdraw
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> :
                <div className="d-flex w-100 justify-content-center bottom-area mt-60 mb-5">
                    <h5>No collateral to display.</h5>
                </div>
            }
            <DepositModal
                amount={amount}
                setAmount={setAmount}
                isOpen={showDModal}
                setIsOpen={setShowDModal}
                deposit={() => deposit(amount)}
                token={token}
            />
            <WithdrawModal
                amount={amount}
                setAmount={setAmount}
                isOpen={showWModal}
                setIsOpen={setShowWModal}
                withdraw={() => withdraw(amount)}
                token={token}
            />
        </div>
    )
}

export default CollateralsTable;