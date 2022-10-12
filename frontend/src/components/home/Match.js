import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import BetModal from '../BetModal';
import MatchCard from './MatchCard';

import { getRoundedNumber } from '../../utils/helper';
import { bet, claim } from '../../actions';

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
                                    <MatchCard
                                        type={betStatus[ele.id] === 0 ? 'betting' : betStatus[ele.id] === 1 ? 'reviewing' : 'claiming'}
                                        days={ele.days}
                                        hours={ele.hours}
                                        minutes={ele.mins}
                                        seconds={ele.secs}
                                        totalBet={getRoundedNumber(totalBets[ele.id])}
                                        team1Logo={ele.team1Logo}
                                        team2Logo={ele.team2Logo}
                                        team1Abbr={ele.team1Abbr}
                                        team2Abbr={ele.team2Abbr}
                                        team1Score={ele.team1Score}
                                        team2Score={ele.team2Score}
                                        team1Bet={betAmounts[ele.id]?.win}
                                        team1Win={earnings[ele.id]?.win}
                                        team1Multi={betAmounts[ele.id]?.win === '0' || earnings[ele.id]?.win === '0' ? multipliers[ele.id]?.win : earnings[ele.id]?.win/betAmounts[ele.id]?.win}
                                        drawBet={betAmounts[ele.id]?.draw}
                                        drawWin={earnings[ele.id]?.draw}
                                        drawMulti={betAmounts[ele.id]?.draw === '0' || earnings[ele.id]?.draw === '0' ? multipliers[ele.id]?.draw : earnings[ele.id]?.draw/betAmounts[ele.id]?.draw}
                                        team2Bet={betAmounts[ele.id]?.lose}
                                        team2Win={earnings[ele.id]?.lose}
                                        team2Multi={betAmounts[ele.id]?.lose === '0' || earnings[ele.id]?.lose === '0' ? multipliers[ele.id]?.lose : earnings[ele.id]?.lose/betAmounts[ele.id]?.lose}
                                        betResult={betResult[ele.id]}
                                        onTeam1Bet={() => openBetModal(ele.id, 0)}
                                        onDrawBet={() => openBetModal(ele.id, 1)}
                                        onTeam2Bet={() => openBetModal(ele.id, 2)}
                                        onClaim={() => handleClaim(ele.id)}
                                    />
                                    {/* <div className="single-area betting-card-rt">
                                        <div className="head-area d-flex align-items-center bet-card-header-rt">
                                            <span className="mdr cmn-btn">Pick Winner</span>
                                            <p>{getTimeString(ele.time)}</p>
                                        </div>
                                        <div className="main-content row">
                                            <div className="team-single col-3">
                                                <h4 className='d-flex justify-content-start country-name-rt'>{ele.team1}</h4>
                                                <div className="img-area flag-container-rt">
                                                    <img src={ele.team1Logo} width="100%" height="100%" alt="image" />
                                                </div>
                                            </div>
                                            <div className="text-center col-6">
                                                { totalBets[ele.id] ?
                                                    <h5 className='d-flex justify-content-center country-name-rt'>
                                                        <span className="bet-label-rt">
                                                            {getRoundedNumber(totalBets[ele.id])} ETH
                                                        </span>
                                                    </h5> :
                                                    <></>
                                                }
                                                <div className="countdown d-flex align-items-center justify-content-around" style={{background: '#1d613a'}}>
                                                    <CounterElement count={ele.days} unit="days" />
                                                    <CounterElement count={ele.hours} unit="hrs" />
                                                    <CounterElement count={ele.mins} unit="mins" />
                                                    <CounterElement count={ele.secs} unit="secs" />
                                                </div>
                                            </div>
                                            <div className="team-single col-3">
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
                                                        <div className='d-flex justify-content-between bet-bn-container-rt'>
                                                            <div>
                                                                <button className="cmn-btn firstTeam bet-bn-rt" onClick={() => openBetModal(ele.id, 0)}>{ele.team1} will win</button>
                                                            </div>
                                                            <div>
                                                                <button className="cmn-btn draw bet-bn-rt" onClick={() => openBetModal(ele.id, 1)}>Draw</button>
                                                            </div>
                                                            <div>
                                                                <button className="cmn-btn lastTeam bet-bn-rt" onClick={() => openBetModal(ele.id, 2)}>{ele.team2} will win</button>
                                                            </div>
                                                        </div>                                       
                                                        <div className='d-flex justify-content-between bet-bn-container-rt'>
                                                            <div>
                                                                <span className="bet-label-rt">
                                                                    {betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].win) : 0}
                                                                    &nbsp;
                                                                    {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].win) : 0}
                                                                    &nbsp;
                                                                    {multipliers[ele.id] ? `${multipliers[ele.id].win}x` : ''}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="bet-label-rt">
                                                                    {betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].draw) : 0}
                                                                    &nbsp;
                                                                    {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].draw) : 0}
                                                                    &nbsp;
                                                                    {multipliers[ele.id] ? `${multipliers[ele.id].draw}x` : ''}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="bet-label-rt">
                                                                    {betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].lose) : 0}
                                                                    &nbsp;
                                                                    {earnings[ele.id] ? getRoundedNumber(earnings[ele.id].lose) : 0}
                                                                    &nbsp;
                                                                    {multipliers[ele.id] ? `${multipliers[ele.id].lose}x` : ''}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="bet-bn-container-rt d-flex justify-content-end" style={{paddingTop: '20px', margin: '0'}}>
                                                            <span style={{color: 'white'}}>
                                                                *
                                                            </span>
                                                            <span className="bet-label-rt" style={{background: '#4512AB', color: 'white', borderRadius: '20px'}}>
                                                                bet&nbsp;&nbsp;winning&nbsp;&nbsp;multilpier
                                                            </span>
                                                        </div>
                                                    </> :
                                                 betStatus[ele.id] === 2 ?
                                                    <>  
                                                        <div className="bottom-item d-flex justify-content-center w-100 pb-0">
                                                            { betResult[ele.id] === 0 ?
                                                                <span className='bet-label-rt'>
                                                                    {earnings[ele.id] && earnings[ele.id].win > 0 ? `${betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].win) : 0}  ${getRoundedNumber(earnings[ele.id].win)}  ${multipliers[ele.id].win}x` : ''}
                                                                    {earnings[ele.id] && earnings[ele.id].win > 0 ? <br /> : <></>}
                                                                    {ele.team1} Won!
                                                                </span> :
                                                             betResult[ele.id] === 1 ?
                                                                <span className='bet-label-rt'>
                                                                    {earnings[ele.id] && earnings[ele.id].draw > 0 ? `${betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].draw) : 0}  ${getRoundedNumber(earnings[ele.id].draw)}  ${multipliers[ele.id].draw}x` : ''}
                                                                    {earnings[ele.id] && earnings[ele.id].draw > 0 ? <br /> : <></>}
                                                                    Drew!
                                                                </span> :
                                                             betResult[ele.id] === 2 ?
                                                                <span className='bet-label-rt'>
                                                                    {earnings[ele.id] && earnings[ele.id].lose > 0 ? `${betAmounts[ele.id] ? getRoundedNumber(betAmounts[ele.id].lose) : 0}  ${getRoundedNumber(earnings[ele.id].lose)}  ${multipliers[ele.id].lose}x` : ''}
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
                                    </div> */}
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