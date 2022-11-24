import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import BetModal from './BetModal';
import MatchCard from './MatchCard';

import { getRoundedNumber } from '../../utils/helper';
import { bet, claim, approveWci } from '../../actions';

var token = "ETH";

const Match = props => {
    const dispatch = useDispatch();
    const { data } = props;

    const {
        earnings, earningsWci,
        betAmounts, betAmountsWci,
        multipliers, multipliersWci,
        betStatus,
        betResult,
    } = useSelector(state => state.transaction);
    const allowed = useSelector(state => state.wci.allowed);

    const [displayCount, setDisplayCount] = useState(6);
    const [displayMatches, setDisplayMatches] = useState([]);
    const [betAmount, setBetAmount] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMatch, setCurrentMatch] = useState(0);
    const [choice, setChoice] = useState(0);
    const [multiplier, setMultiplier] = useState(1);

    const { account } = useWeb3React();

    const handleBrowseMore = () => {
        if (displayCount > data.length) return;
        setDisplayCount(displayCount + 6);
    }

    useEffect(() => {
        setDisplayMatches(data.slice(0, displayCount));
    }, [data, displayCount]);

    const openBetModal = (matchId, _choice, _token, _multiplier) => {
        setCurrentMatch(matchId);
        setChoice(_choice);
        setModalOpen(true);
        setMultiplier(_multiplier);
        token = _token;
    }

    const doBet = () => {
        if (!account) {
            toast.error('Please connect your wallet!');
            return;
        }
        if (betAmount < 0.01) {
            toast.error('Minimum bet amount is 0.01 ether.');
            return;
        }

        dispatch(bet(account, currentMatch, betAmount, multiplier, choice, token, () => {
            setBetAmount(0);
            setModalOpen(false);
        }));
    }

    const handleClaim = (matchId, token) => {
        if (!account) {
            toast.error('Please connect your wallet.');
            return;
        }

        dispatch(claim(account, matchId, token));
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
                                        type={ele.matchStatus === 0 ? 'betting' : ele.matchStatus === 1 ? 'reviewing' : 'claiming'}
                                        days={ele.days}
                                        hours={ele.hours}
                                        minutes={ele.mins}
                                        seconds={ele.secs}
                                        matchId={ele.id}
                                        totalBet={getRoundedNumber(ele.totalBet)}
                                        totalBetWci={getRoundedNumber(ele.totalBetWci)}
                                        team1Logo={ele.team1Logo}
                                        team2Logo={ele.team2Logo}
                                        team1Abbr={ele.team1}
                                        team2Abbr={ele.team2}
                                        team1Score={ele.team1Score}
                                        team2Score={ele.team2Score}
                                        team1Bet={getRoundedNumber(betAmounts[ele.id]?.win)}
                                        team1BetWci={getRoundedNumber(betAmountsWci[ele.id]?.win)}
                                        team1Win={getRoundedNumber(earnings[ele.id]?.win)}
                                        team1WinWci={getRoundedNumber(earningsWci[ele.id]?.win)}
                                        team1Multi={betAmounts[ele.id]?.win === '0' || earnings[ele.id]?.win === '0' ? multipliers[ele.id]?.win : getRoundedNumber(earnings[ele.id]?.win/betAmounts[ele.id]?.win)}
                                        team1MultiWci={multipliersWci[ele.id]?.win}
                                        drawBet={getRoundedNumber(betAmounts[ele.id]?.draw)}
                                        drawBetWci={getRoundedNumber(betAmountsWci[ele.id]?.draw)}
                                        drawWin={(getRoundedNumber(earnings[ele.id]?.draw))}
                                        drawWinWci={(getRoundedNumber(earningsWci[ele.id]?.draw))}
                                        drawMulti={betAmounts[ele.id]?.draw === '0' || earnings[ele.id]?.draw === '0' ? multipliers[ele.id]?.draw : getRoundedNumber(earnings[ele.id]?.draw/betAmounts[ele.id]?.draw)}
                                        drawMultiWci={multipliersWci[ele.id]?.draw}
                                        team2Bet={getRoundedNumber(betAmounts[ele.id]?.lose)}
                                        team2BetWci={getRoundedNumber(betAmountsWci[ele.id]?.lose)}
                                        team2Win={(getRoundedNumber(earnings[ele.id]?.lose))}
                                        team2WinWci={(getRoundedNumber(earningsWci[ele.id]?.lose))}
                                        team2Multi={betAmounts[ele.id]?.lose === '0' || earnings[ele.id]?.lose === '0' ? multipliers[ele.id]?.lose : getRoundedNumber(earnings[ele.id]?.lose/betAmounts[ele.id]?.lose)}
                                        team2MultiWci={multipliersWci[ele.id]?.lose}
                                        betResult={betResult[ele.id]}
                                        onBet={openBetModal}
                                        onClaim={handleClaim}
                                        wciAllowed={allowed}
                                        approveWci={() => dispatch(approveWci(account))}
                                    />
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
                <BetModal
                    isOpen={modalOpen}
                    setIsOpen={setModalOpen}
                    betAmount={betAmount}
                    setBetAmount={setBetAmount}
                    doBet={doBet} token={token}
                />
            </section>
        </>
    );
}

export default Match;