import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../layouts/Header';
import { AddMatchCard } from '../components/addmatch/form';
import { depositEthAdmin, depositWciAdmin, setTaxAdmin } from '../actions';
import { useWeb3React } from '@web3-react/core';

const Deposit = () => {
    const dispatch = useDispatch();
    const { account } = useWeb3React();

    const [ethAmount, setEthAmount] = useState(0);
    const [wciAmount, setWciAmount] = useState(0);
    const [tax, setTax] = useState(0);

    const handleDepositEth = () => {
        dispatch(depositEthAdmin(account, ethAmount));
    }

    const handleDepositWci = () => {
        dispatch(depositWciAdmin(account, wciAmount));
    }

    const handleSetTax = () => {
        dispatch(setTaxAdmin(account, tax));
    }

    return (
        <>
            <Header />
            <div className="container pt-120">
                <AddMatchCard>
                    <h4 className="mb-4">Deposit Funds</h4>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>* Deposit ETH</label>
                                <div className="input-area">
                                    <input type="number" value={ethAmount} onChange={e => setEthAmount(e.target.value)} />
                                </div>
                                <div className="input-area mt-3 w-100 d-flex justify-content-center">
                                    <button onClick={handleDepositEth} className="cmn-btn">Deposit ETH</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>* Deposit WCI</label>
                                <div className="input-area">
                                    <input type="number" value={wciAmount} onChange={e => setWciAmount(e.target.value)} />
                                </div>
                                <div className="input-area mt-3 w-100 d-flex justify-content-center">
                                    <button onClick={handleDepositWci} className="cmn-btn">Deposit WCI</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>* Set tax rate</label>
                                <div className="input-area">
                                    <input type="number" value={tax} onChange={e => setTax(e.target.value)} />
                                </div>
                                <div className="input-area mt-3 w-100 d-flex justify-content-center">
                                    <button onClick={handleSetTax} className="cmn-btn">Set Tax</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AddMatchCard>
            </div>
        </>
    );
}

export default Deposit;