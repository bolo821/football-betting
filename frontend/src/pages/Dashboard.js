import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import TotalImg from '../assets/images/total.png';
import ClaimImg from '../assets/images/claim.png';
import DCard from '../components/dashboard/DCard';
import ReferralCard from '../components/dashboard/ReferralCard';
import { getRoundedNumber1 } from '../utils/helper';

const Dashboard = () => {
    const { betAmounts, betAmountsWci, claimHistory, claimHistoryWci } = useSelector(state => state.transaction);
    const [totalBet, setTotalBet] = useState(0);
    const [totalBetWci, setTotalBetWci] = useState(0);
    const [totalClaim, setTotalClaim] = useState(0);
    const [totalClaimWci, setTotalClaimWci] = useState(0);

    useEffect(() => {
        if (betAmounts.length > 0 && claimHistory.length > 0) {
            let tmpTotal = 0, tmpTotalW = 0, tmpClaim = 0, tmpClaimW = 0;

            for (let i=0; i<betAmounts.length; i++) {
                tmpTotal += parseFloat(betAmounts[i].win) + parseFloat(betAmounts[i].draw) + parseFloat(betAmounts[i].lose);
                tmpTotalW += parseFloat(betAmountsWci[i].win) + parseFloat(betAmountsWci[i].draw) + parseFloat(betAmountsWci[i].lose);
                tmpClaim += parseFloat(claimHistory[i]);
                tmpClaimW += parseFloat(claimHistoryWci[i]);
            }
    
            setTotalBet(tmpTotal);
            setTotalBetWci(tmpTotalW);
            setTotalClaim(tmpClaim);
            setTotalClaimWci(tmpClaimW);
        }
    }, [betAmounts, betAmountsWci, claimHistory, claimHistoryWci]);

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
                                    <h3 className='m-0'>Dashboard</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-rt mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-md-6 col-12">
                                <DCard Image={TotalImg} label={`${getRoundedNumber1(totalBet)} ETH`} description="Total Bet ETH Amount" />
                            </div>
                            <div className="col-xl-3 col-md-6 col-12">
                                <DCard Image={ClaimImg} label={`${getRoundedNumber1(totalClaim)} ETH`} description="Total Earning ETH Amount" />
                            </div>
                            <div className="col-xl-3 col-md-6 col-12">
                                <DCard Image={TotalImg} label={`${parseInt(totalBetWci)} WCI`} description="Total Bet WCI Amount" />
                            </div>
                            <div className="col-xl-3 col-md-6 col-12">
                                <DCard Image={ClaimImg} label={`${parseInt(totalClaimWci)} WCI`} description="Total Earning WCI Amount" />
                            </div>
                        </div>
                        <ReferralCard />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;