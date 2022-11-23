import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import { getRoundedNumber2 } from '../utils/helper';

const Leaderboard = () => {
    const { leaderboard } = useSelector(state => state.leaderboard);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(leaderboard.map(ele => {
            return {
                account: ele.account,
                totalBet: getRoundedNumber2(ele.totalBet),
                totalClaim: getRoundedNumber2(ele.totalClaim),
                totalBetWci: parseInt(ele.totalBetWci),
                totalClaimWci: parseInt(ele.totalClaimWci),
            }
        }))
    }, [leaderboard]);

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
                                    <h3 className='m-0'>Leaderboard</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-rt">
                    <LeaderboardTable data={data} />
                </div>
            </section>
        </>
    )
}

export default Leaderboard;