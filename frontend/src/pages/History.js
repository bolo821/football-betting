import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import HistoryTable from '../components/history/HistoryTable';
import { getRoundedNumber } from '../utils/helper';

const History = () => {
    const matches = useSelector(state => state.match.matches);
    const { betStatus, betResult, claimHistory, earnings, betAmounts, claimHistoryWci, earningsWci, betAmountsWci } = useSelector(state => state.transaction);
    

    const [data, setData] = useState([]);

    useEffect(() => {
        let temp = [];

        if (betStatus.length) {
            for (let i=0; i<matches.length; i++) {
                let betId = matches[i].matchId;
                let bet = betAmounts[betId];
                let betWci = betAmountsWci[betId];
                let team1 = matches[i].team1Name;
                let team2 = matches[i].team2Name;
                let status = betStatus[betId];
                let ele = {
                    team1: team1,
                    team2: team2,
                }
                let result = betResult[betId];
                let status_ = status === 0 ? 'Betting' : 'In Play';

                if (bet.win !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earnings[betId]?.win;
                    } else {
                        if (result === 0) {
                            if (earnings[betId]?.win === '0') {
                                profit = claimHistory[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earnings[betId]?.win;
                                status_ = 'Clamable';
                            }
                        } else {
                            profit = '0';
                            status_ = 'Lost';
                        }
                    }
                    temp.push({
                        ...ele,
                        choice: team1,
                        betAmount: getRoundedNumber(bet.win),
                        profit: getRoundedNumber(profit),
                        status: status_,
                        token: 'ETH',
                    });
                }
                if (betWci.win !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earningsWci[betId]?.win;
                    } else {
                        if (result === 0) {
                            if (earningsWci[betId]?.win === '0') {
                                profit = claimHistoryWci[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earningsWci[betId]?.win;
                                status_ = 'Clamable';
                            }
                        } else {
                            profit = '0';
                            status_ = 'Lost';
                        }
                    }
                    temp.push({
                        ...ele,
                        choice: team1,
                        betAmount: parseInt(betWci.win),
                        profit: parseInt(profit),
                        status: status_,
                        token: 'WCI',
                    });
                }
                if (bet.draw !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earnings[betId]?.draw;
                    } else {
                        if (result === 1) {
                            if (earnings[betId]?.draw === '0') {
                                profit = claimHistory[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earnings[betId]?.draw;
                                status_ = 'Clamable';
                            }
                        } else {
                            profit = '0';
                            status_ = 'Lost';
                        }
                    }
                    temp.push({
                        ...ele,
                        choice: 'Draw',
                        betAmount: getRoundedNumber(bet.draw),
                        profit: getRoundedNumber(profit),
                        status: status_,
                        token: 'ETH',
                    });
                }
                if (betWci.draw !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earningsWci[betId]?.draw;
                    } else {
                        if (result === 1) {
                            if (earningsWci[betId]?.draw === '0') {
                                profit = claimHistoryWci[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earningsWci[betId]?.draw;
                                status_ = 'Clamable';
                            }
                        } else {
                            profit = '0';
                            status_ = 'Lost';
                        }
                    }
                    temp.push({
                        ...ele,
                        choice: 'Draw',
                        betAmount: parseInt(betWci.draw),
                        profit: parseInt(profit),
                        status: status_,
                        token: 'WCI',
                    });
                }
                if (bet.lose !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earnings[betId]?.lose;
                    } else {
                        if (result === 2) {
                            if (earnings[betId]?.lose === '0') {
                                profit = claimHistory[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earnings[betId]?.lose;
                                status_ = 'Clamable';
                            }
                        } else {
                            profit = '0';
                            status_ = 'Lost';
                        }
                    }
                    temp.push({
                        ...ele,
                        choice: team2,
                        betAmount: getRoundedNumber(bet.lose),
                        profit: getRoundedNumber(profit),
                        status: status_,
                        token: 'ETH',
                    });
                }
                if (betWci.lose !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earningsWci[betId]?.lose;
                    } else {
                        if (result === 2) {
                            if (earningsWci[betId]?.lose === '0') {
                                profit = claimHistoryWci[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earningsWci[betId]?.lose;
                                status_ = 'Clamable';
                            }
                        } else {
                            profit = '0';
                            status_ = 'Lost';
                        }
                    }
                    temp.push({
                        ...ele,
                        choice: team2,
                        betAmount: parseInt(betWci.lose),
                        profit: parseInt(profit),
                        status: status_,
                        token: 'WCI',
                    });
                }
            }
        }

        setData(temp);
    }, [betStatus, matches]);

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
                                    <h3 className='m-0'>History</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-rt">
                    <HistoryTable data={data} />
                </div>
            </section>
        </>
    )
}

export default History;