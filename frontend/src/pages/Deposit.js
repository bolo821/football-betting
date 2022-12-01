import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../layouts/Header';
import { AddMatchCard } from '../components/addmatch/form';
import { depositEthAdmin, depositWciAdmin, setTaxAdmin, transferOwnership, setBetStatsData } from '../actions';
import { useWeb3React } from '@web3-react/core';

const Deposit = () => {
    const dispatch = useDispatch();
    const { account } = useWeb3React();

    const [ethAmount, setEthAmount] = useState(0);
    const [wciAmount, setWciAmount] = useState(0);
    const [tax, setTax] = useState(0);
    const [owner, setOwner] = useState('');

    const [ethPrize, setEthPrize] = useState(0);
    const [ethCount, setEthCount] = useState(0);
    const [wciPrize, setWciPrize] = useState(0);
    const [wciCount, setWciCount] = useState(0);

    const handleDepositEth = () => {
        dispatch(depositEthAdmin(account, ethAmount));
    }

    const handleDepositWci = () => {
        dispatch(depositWciAdmin(account, wciAmount));
    }

    const handleSetTax = () => {
        dispatch(setTaxAdmin(account, tax));
    }

    const handleTransferOwnership = () => {
        dispatch(transferOwnership(account, owner));
    }

    const handleSetBetStatsDataEth = () => {
        dispatch(setBetStatsData(account, ethPrize, ethCount, 0));
    }

    const handleSetBetStatsDataWci = () => {
        dispatch(setBetStatsData(account, wciPrize, wciCount, 1));
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
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>New owner</label>
                                <div className="input-area">
                                    <input type="text" value={owner} onChange={e => setOwner(e.target.value)} />
                                </div>
                                <div className="input-area mt-3 w-100 d-flex justify-content-center">
                                    <button onClick={handleTransferOwnership} className="cmn-btn">Set Owner</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>Total ETH Prize</label>
                                <div className="input-area">
                                    <input type="number" value={ethAmount} onChange={e => setEthAmount(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>Total WCI Winner Count</label>
                                <div className="input-area">
                                    <input type="number" value={ethCount} onChange={e => setEthCount(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex w-100 justify-content-center mt-3">
                            <button onClick={handleSetBetStatsDataEth} className="cmn-btn">Set ETH stats data</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>Total WCI Prize</label>
                                <div className="input-area">
                                    <input type="number" value={wciAmount} onChange={e => setWciAmount(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-single">
                                <label>Total WCI Winner Count</label>
                                <div className="input-area">
                                    <input type="number" value={wciCount} onChange={e => setWciCount(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex w-100 justify-content-center mt-3">
                            <button onClick={handleSetBetStatsDataWci} className="cmn-btn">Set WCI stats data</button>
                        </div>
                    </div>
                </AddMatchCard>
            </div>
        </>
    );
}

export default Deposit;