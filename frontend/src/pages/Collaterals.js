import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import CollateralsTable from '../components/collaterals/CollateralsTable';
import { getCollaterals, approveUsdt, approveUsdc, approveShib, approveDoge, depositEth, depositTokens, withdrawTokens } from '../actions';

const Collaterals = () => {
    const dispatch = useDispatch();
    const { account } = useWeb3React();
    const collaterals = useSelector(state => state.collateral);
    const { eth, usdt, usdc, shib, doge, usdtAllowance, usdcAllowance, shibAllowance, dogeAllowance } = collaterals;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (account) {
            dispatch(getCollaterals(account));  
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            setData([
                {
                    crypto: 'ETH',
                    amount: eth,
                    handleDeposit: (amount) => dispatch(depositEth(account, amount)),
                    handleWithdraw: (amount) => dispatch(withdrawTokens(account, amount, 0)),
                },
                {
                    crypto: 'USDT',
                    amount: usdt,
                    allowance: usdtAllowance,
                    handleApprove: () => dispatch(approveUsdt(account)),
                    handleDeposit: (amount) => dispatch(depositTokens(account, amount, 1)),
                    handleWithdraw: (amount) => dispatch(withdrawTokens(account, amount, 1)),
                },
                {
                    crypto: 'USDC',
                    amount: usdc,
                    allowance: usdcAllowance,
                    handleApprove: () => dispatch(approveUsdc(account)),
                    handleDeposit: (amount) => dispatch(depositTokens(account, amount, 2)),
                    handleWithdraw: (amount) => dispatch(withdrawTokens(account, amount, 2)),
                },
                {
                    crypto: 'SHIB',
                    amount: shib,
                    allowance: shibAllowance,
                    handleApprove: () => dispatch(approveShib(account)),
                    handleDeposit: (amount) => dispatch(depositTokens(account, amount, 3)),
                    handleWithdraw: (amount) => dispatch(withdrawTokens(account, amount, 3)),
                },
                {
                    crypto: 'DOGE',
                    amount: doge,
                    allowance: dogeAllowance,
                    handleApprove: () => dispatch(approveDoge(account)),
                    handleDeposit: (amount) => dispatch(depositTokens(account, amount, 4)),
                    handleWithdraw: (amount) => dispatch(withdrawTokens(account, amount, 4)),
                },
            ])
        }
    }, [account, collaterals]);

    return (
        <>
            <Header />
            <Section1 />
            <section className="pt-5 history-section-rt">
                <div className="bet-this-game all-soccer-bets">
                    <div className="title-rt">
                        <div className="container">
                            <div className="title-container-rt">
                                <div className="text-center">
                                    <h3 className='m-0'>Collaterals</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-rt">
                    <CollateralsTable data={data} />
                </div>
            </section>
        </>
    )
}

export default Collaterals;