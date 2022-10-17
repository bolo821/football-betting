import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import HistoryTable from '../components/history/HistoryTable';
import { getRoundedNumber } from '../utils/helper';

const History = () => {
    const betStatus = useSelector(state => state.transaction.betStatus);
    const claimHistory = useSelector(state => state.transaction.claimHistory);
    const earnings = useSelector(state => state.transaction.earnings);
    const betAmounts = useSelector(state => state.transaction.betAmounts);
    const betResult = useSelector(state => state.transaction.betResult);
    const matches = useSelector(state => state.match.matches);

    const [data, setData] = useState([]);

    useEffect(() => {
        let temp = [];

        if (betStatus.length) {
            for (let i=0; i<matches.length; i++) {
                let betId = matches[i].matchId;
                let bet = betAmounts[betId];
                let team1 = matches[i].team1Name;
                let team2 = matches[i].team2Name;
                let status = betStatus[betId];
                let ele = {
                    team1: team1,
                    team2: team2,
                }
                let result = betResult[betId];
                let status_ = status === 0 ? 'Betting' : 'Reviewing';

                if (bet.win !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earnings[betId].win;
                    } else {
                        if (result === 0) {
                            if (earnings[betId].win === '0') {
                                profit = claimHistory[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earnings[betId].win;
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
                        betAmount: bet.win,
                        profit: getRoundedNumber(profit),
                        status: status_,
                    });
                }
                if (bet.draw !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earnings[betId].draw;
                    } else {
                        if (result === 1) {
                            if (earnings[betId].draw === '0') {
                                profit = claimHistory[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earnings[betId].draw;
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
                        betAmount: bet.draw,
                        profit: getRoundedNumber(profit),
                        status: status_,
                    });
                }
                if (bet.lose !== '0') {
                    let profit;
                    if (status === 0 || status === 1) {
                        profit = earnings[betId].lose;
                    } else {
                        if (result === 2) {
                            if (earnings[betId].lose === '0') {
                                profit = claimHistory[betId];
                                status_ = 'Claimed';
                            } else {
                                profit = earnings[betId].lose;
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
                        betAmount: bet.lose,
                        profit: getRoundedNumber(profit),
                        status: status_,
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
            <HistoryTable data={data} />
        </>
    )
}

export default History;