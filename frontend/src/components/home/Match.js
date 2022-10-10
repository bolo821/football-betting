import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import CounterElement from '../CounterElement';
import BetModal from '../BetModal';

import { getRoundedNumber } from '../../utils/helper';
import { bet, claim } from '../../actions';
import { getTimeString } from '../../utils/helper';

const Match = props => {
    const dispatch = useDispatch();
    const { data } = props;

    const earnings = useSelector(state => state.transaction.earnings);
    const betAmounts = useSelector(state => state.transaction.betAmounts);
    const multipliers = useSelector(state => state.transaction.multipliers);
    const betStatus = useSelector(state => state.transaction.betStatus);
    const betResult = useSelector(state => state.transaction.betResult);
    const totalBets = useSelector(state => state.transaction.totalBets);

    const [displayCount, setDisplayCount] = useState(6);
    const [displayMatches, setDisplayMatches] = useState([]);
    const [betAmount, setBetAmount] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMatch, setCurrentMatch] = useState(0);
    const [choice, setChoice] = useState(0);

    const { account } = useWeb3React();

    const handleBrowseMore = () => {
        if (displayCount > data.length) return;
        setDisplayCount(displayCount + 6);
    }

    useEffect(() => {
        setDisplayMatches(data.slice(0, displayCount));
    }, [data]);

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
        if (betAmount < 0.011) {
            toast.error('Minimum bet amount is 0.01 ether.');
            return;
        }

        dispatch(bet(account, currentMatch, betAmount, choice, () => {
            setBetAmount(0);
            setModalOpen(false);
        }));
    }

    const handleClaim = matchId => {
        if (!account) {
            toast.error('Please connect your wallet.');
            return;
        }

        dispatch(claim(account, matchId));
    }

    return (
        <>
            <section className="bet-this-game all-soccer-bets bets-2 section2-rt">
                <div className="pb-120 bet-part-rt">
                    <div className="container">
                        <div className="row cus-mar">
                            { displayMatches.map((ele, index) => (
                                <div className="col-lg-6" key={index}>
                                    <div className="single-area betting-card-rt">
                                        <div className="head-area d-flex align-items-center">
                                            <span className="mdr cmn-btn">Pick Winner</span>
                                            <p>{getTimeString(ele.time)}</p>
                                        </div>
                                        <div className="main-content row">
                                            <div className="team-single col-lg-3 col-md-12">
                                                <h4 className='d-flex justify-content-start country-name-rt'>{ele.team1}</h4>
                                                <div className="img-area flag-container-rt">
                                                    <img src={ele.team1Logo} width="100%" height="100%" alt="image" />
                                                </div>
                                            </div>
                                            <div className="mid-area text-center col-lg-6 col-md-12">
                                                { totalBets[ele.id] ?
                                                    <h5 className='d-flex justify-content-center country-name-rt'>
                                                        <span className="bet-label-rt">
                                                            {getRoundedNumber(totalBets[ele.id])}ETH
                                                        </span>
                                                    </h5> :
                                                    <></>
                                                }
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
                                                            <button className="cmn-btn firstTeam mx-1" onClick={() => openBetModal(ele.id, 0)}>{ele.team1} will win</button>
                                                            <button className="cmn-btn draw mx-1" onClick={() => openBetModal(ele.id, 1)}>Draw</button>
                                                            <button className="cmn-btn lastTeam mx-1" onClick={() => openBetModal(ele.id, 2)}>{ele.team2} will win</button>
                                                        </div>                                       
                                                        <div className="bottom-item" style={{border: 'none', paddingTop: '10px', paddingBottom: '0'}}>
                                                            <span className="bet-label-rt">
                                                                {betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].win) : 0}
                                                                &nbsp;&nbsp;
                                                                {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].win) : 0}
                                                                &nbsp;&nbsp;
                                                                {multipliers[ele.id] ? `${multipliers[ele.id].win}x` : ''}
                                                            </span>
                                                            <span className="bet-label-rt">
                                                                {betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].draw) : 0}
                                                                &nbsp;&nbsp;
                                                                {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].draw) : 0}
                                                                &nbsp;&nbsp;
                                                                {multipliers[ele.id] ? `${multipliers[ele.id].draw}x` : ''}
                                                            </span>
                                                            <span className="bet-label-rt">
                                                                {betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].lose) : 0}
                                                                &nbsp;&nbsp;
                                                                {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].lose) : 0}
                                                                &nbsp;&nbsp;
                                                                {multipliers[ele.id] ? `${multipliers[ele.id].lose}x` : ''}
                                                            </span>
                                                        </div>
                                                        <div className="bottom-item" style={{border: 'none', paddingTop: '0'}}>
                                                            <span className="bet-label-rt" style={{fontSize: '10px'}}>
                                                                bet winning multilpier
                                                            </span>
                                                            <span className="bet-label-rt" style={{fontSize: '10px'}}>
                                                                bet winning multilpier
                                                            </span>
                                                            <span className="bet-label-rt" style={{fontSize: '10px'}}>
                                                                bet winning multilpier
                                                            </span>
                                                        </div>
                                                    </> :
                                                 betStatus[ele.id] === 2 ?
                                                    <>  
                                                        <div className="bottom-item d-flex justify-content-center w-100 pb-0">
                                                            { betResult[ele.id] === 0 ?
                                                                <span className='bet-label-rt'>
                                                                    {earnings[ele.id] && earnings[ele.id].win > 0 ? `${betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].win) : 0}  ${earnings[ele.id].win}  ${multipliers[ele.id].win}x` : ''}
                                                                    {earnings[ele.id] && earnings[ele.id].win > 0 ? <br /> : <></>}
                                                                    {ele.team1} Won!
                                                                </span> :
                                                             betResult[ele.id] === 1 ?
                                                                <span className='bet-label-rt'>
                                                                    {earnings[ele.id] && earnings[ele.id].draw > 0 ? `${betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].draw) : 0}  ${earnings[ele.id].draw}  ${multipliers[ele.id].draw}x` : ''}
                                                                    {earnings[ele.id] && earnings[ele.id].draw > 0 ? <br /> : <></>}
                                                                    Drew!
                                                                </span> :
                                                             betResult[ele.id] === 2 ?
                                                                <span className='bet-label-rt'>
                                                                    {earnings[ele.id] && earnings[ele.id].lose > 0 ? `${betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].lose) : 0}  ${earnings[ele.id].lose}  ${multipliers[ele.id].lose}x` : ''}
                                                                    {earnings[ele.id] && earnings[ele.id].lose > 0 ? <br /> : <></>}
                                                                    {ele.team2} Won!
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
                        { displayCount < data.length &&
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
                        { displayMatches.length === 0 &&
                            <div className="d-flex w-100 justify-content-center bottom-area mt-60">
                                <h5>No matches to display.</h5>
                            </div>
                        }
                    </div>
                </div>
                <BetModal isOpen={modalOpen} setIsOpen={setModalOpen} betAmount={betAmount} setBetAmount={setBetAmount} doBet={doBet} />
            </section>
        </>
    );
}

export default Match;