import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import CounterElement from '../CounterElement';
import BetModal from '../BetModal';

import { getTimeDifference, getRoundedNumber } from '../../utils/helper';
import { matchData } from './matchData';
import { bet, getEarnings, claim, getMultipliers, getBetStatus, getBetResult } from '../../actions';
import { useRouterContract } from '../../hooks/useContract';

const Section2 = () => {
    const dispatch = useDispatch();

    const earnings = useSelector(state => state.transaction.earnings);
    const multipliers = useSelector(state => state.transaction.multipliers);
    const betStatus = useSelector(state => state.transaction.betStatus);
    const betResult = useSelector(state => state.transaction.betResult);

    const [matches, setMatches] = useState(matchData);
    const [timer, setTimer] = useState(null);
    const [displayCount, setDisplayCount] = useState(6);
    const [displayMatches, setDisplayMatches] = useState([]);
    const [betAmount, setBetAmount] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMatch, setCurrentMatch] = useState(0);
    const [choice, setChoice] = useState(0);

    const routerContract = useRouterContract();
    const { account } = useWeb3React();

    useEffect(() => {
        let timerId = setInterval(() => {
            let newMatches = matches.map(ele => {
                let diff = getTimeDifference(new Date(), ele.time);
                return {
                    ...ele,
                    days: diff.day,
                    hours: diff.hour,
                    mins: diff.minute,
                    secs: diff.second,
                }
            });

            setMatches(newMatches);
        });
        setTimer(timerId);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, []);

    const handleBrowseMore = () => {
        if (displayCount > matches.length) return;
        setDisplayCount(displayCount + 6);
    }

    useEffect(() => {
        setDisplayMatches(matches.slice(0, displayCount));
    }, [matches]);

    useEffect(() => {
        if (account) {
            dispatch(getEarnings(routerContract, account));
            dispatch(getMultipliers(routerContract));
            dispatch(getBetStatus(routerContract));
            dispatch(getBetResult(routerContract));
        }
    }, [account]);

    const openBetModal = (matchId, _choice) => {
        setCurrentMatch(matchId);
        setChoice(_choice);
        setModalOpen(true);
    }

    const doBet = () => {
        if (!account) {
            toast.error('Please connect your wallet!');
            return;
        }
        dispatch(bet(routerContract, account, currentMatch, betAmount, choice, () => {
            setBetAmount(0);
            setModalOpen(false);
        }));
    }

    const handleClaim = matchId => {
        if (!account) {
            toast.error('Please connect your wallet.');
            return;
        }

        dispatch(claim(routerContract, account, matchId));
    }

    return (
        <>
            <section className="bet-this-game all-soccer-bets bets-2 section2-rt">
                <div className="toolbar-rt">
                    <div className="container">
                        <div className="filter-section">
                            <div className="section-text text-center">
                                <h3>FIFA WorldCup 2022 Bets</h3>
                            </div>
                            <form action="#">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="input-area">
                                            <img src="assets/images/icon/search-icon.png" alt="icon" />
                                            <input type="text" placeholder="Search by Team" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="input-area">
                                            <img src="assets/images/icon/date-icon.png" alt="icon" />
                                            <input type="text" id="dateSelect" placeholder="Select Date" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pb-120 bet-part-rt">
                    <div className="container">
                        <div className="row cus-mar">
                            { displayMatches.map((ele, index) => (
                                <div className="col-lg-6" key={index}>
                                    <div className="single-area betting-card-rt">
                                        <div className="head-area d-flex align-items-center">
                                            <span className="mdr cmn-btn">Pick Winner</span>
                                            <p>{ele.time}</p>
                                        </div>
                                        <div className="main-content row">
                                            <div className="team-single col-lg-3 col-md-12">
                                                <h4 className='d-flex justify-content-start country-name-rt'>{ele.team1}</h4>
                                                <div className="img-area flag-container-rt">
                                                    <img src={ele.team1Logo} width="100%" height="100%" alt="image" />
                                                </div>
                                            </div>
                                            <div className="mid-area text-center col-lg-6 col-md-12">
                                                <div className="countdown d-flex align-items-center justify-content-around">
                                                    <CounterElement count={ele.days} unit="days" />
                                                    <CounterElement count={ele.hours} unit="hrs" />
                                                    <CounterElement count={ele.mins} unit="mins" />
                                                    <CounterElement count={ele.secs} unit="secs" />
                                                </div>
                                            </div>
                                            <div className="team-single col-lg-3 col-md-12">
                                                <h4 className="d-flex justify-content-end h4-rt country-name-rt">{ele.team2}</h4>
                                                <div className="img-area flag-container-rt">
                                                    <img src={ele.team2Logo} width="100%" height="100%" alt="image" />
                                                </div>
                                            </div>
                                        </div>

                                        { account ?
                                            <>
                                                { betStatus[ele.id] === 0 ?
                                                    <>     
                                                        <div className="bottom-item" style={account ? {paddingBottom: '0'} : {}}>
                                                            <button className="cmn-btn firstTeam" onClick={() => openBetModal(ele.id, 0)}>{ele.team1} will win</button>
                                                            <button className="cmn-btn draw" onClick={() => openBetModal(ele.id, 1)}>Draw</button>
                                                            <button className="cmn-btn lastTeam" onClick={() => openBetModal(ele.id, 2)}>{ele.team2} will win</button>
                                                        </div>                                       
                                                        <div className="bottom-item" style={{border: 'none', paddingTop: '10px'}}>
                                                            <span>
                                                                {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].win) : 0}
                                                                {multipliers[ele.id] ? `(x${multipliers[ele.id].win})` : ''}
                                                            </span>
                                                            <span>
                                                                {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].draw) : 0}
                                                                {multipliers[ele.id] ? `(x${multipliers[ele.id].draw})` : ''}
                                                            </span>
                                                            <span>
                                                                {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].lose) : 0}
                                                                {multipliers[ele.id] ? `(x${multipliers[ele.id].lose})` : ''}
                                                            </span>
                                                        </div>
                                                    </> :
                                                 betStatus[ele.id] === 2 ?
                                                    <>  
                                                        <div className="bottom-item d-flex justify-content-center w-100 pb-0">
                                                            { betResult[ele.id] === 0 ?
                                                                <span>
                                                                    {earnings[ele.id] ? earnings[ele.id].win : 0}
                                                                    {earnings[ele.id] && earnings[ele.id].win > 0 ? `(x${multipliers[ele.id].win})` : ''}
                                                                    ({ele.team1} Won!)
                                                                </span> :
                                                             betResult[ele.id] === 1 ?
                                                                <span>
                                                                    {earnings[ele.id] ? earnings[ele.id].draw : 0}
                                                                    {earnings[ele.id] && earnings[ele.id].draw > 0 ? `(x${multipliers[ele.id].draw})` : ''}
                                                                    (Drew!)
                                                                </span> :
                                                             betResult[ele.id] === 2 ?
                                                                <span>
                                                                    {earnings[ele.id] ? earnings[ele.id].lose : 0}
                                                                    {earnings[ele.id] && earnings[ele.id].lose > 0 ? `(x${multipliers[ele.id].lose})` : ''}
                                                                    ({ele.team2} Won!)
                                                                </span> :
                                                                <></>
                                                            }
                                                        </div>
                                                        {
                                                            (betResult[ele.id] === 0 && earnings[ele.id] && parseFloat(earnings[ele.id].win) > 0 ||
                                                            betResult[ele.id] === 1 && earnings[ele.id] && parseFloat(earnings[ele.id].draw) > 0 ||
                                                            betResult[ele.id] === 2 && earnings[ele.id] && parseFloat(earnings[ele.id].lose) > 0) &&
                                                            <div className="d-flex justify-content-center w-100 py-4">
                                                                <button className="cmn-btn firstTeam" onClick={() => handleClaim(ele.id)}>Claim</button>
                                                            </div>
                                                        }                                       
                                                    </> :
                                                    <div className="bottom-item d-flex justify-content-center w-100 py-4 text-white">
                                                        The match is under review. You can't bet or claim for now.
                                                    </div>
                                                }
                                            </> :
                                            <></>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        { displayCount < matches.length &&
                            <div className="row">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="bottom-area mt-60">
                                        <span className="btn-border">
                                            <button onClick={handleBrowseMore} className="cmn-btn">Browse More</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <BetModal isOpen={modalOpen} setIsOpen={setModalOpen} betAmount={betAmount} setBetAmount={setBetAmount} doBet={doBet} />
            </section>
        </>
    );
}

export default Section2;