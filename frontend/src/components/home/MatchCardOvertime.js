import React, { useState } from 'react';
import { 
    MatchCard as MatchCardContainer,
    MatchCardHeader,
    TokenSelect,
    NumberCardContainer,
    NumberCard,
    MatchCardBody,
    MatchCardBodyHeader,
    MatchScore,
    MatchScoreLogo,
    MatchScoreMark,
    BetCardContainer2,
    BetCard,
    MatchCardClaimButton,
} from './MatchCardElements';
import { useWeb3React } from '@web3-react/core';

const MatchCardOvertime = props => {
    const {
        type, // one of betting, reviewing, claiming and upcoming.
        matchId,
        days, hours, minutes, seconds,
        team1Logo, team2Logo, team1Abbr, team2Abbr,
        team1Score, team2Score,
        totalBet, totalBetWci,
        team1Bet, team1Win, team1Multi, team1BetWci, team1WinWci, team1MultiWci,
        team2Bet, team2Win, team2Multi, team2BetWci, team2WinWci, team2MultiWci,
        onBet, onClaim,
        betResult,
        wciAllowed, approveWci,
    } = props;
    const { account } = useWeb3React();
    const [token, setToken] = useState('WCI');

    const checkBetStarted = () => {
        if (parseInt(days) === 0 && parseInt(hours) === 0 && parseInt(minutes) < 1) return true;
        return false;
    }

    return (
        <MatchCardContainer>
            <MatchCardHeader>
                <div className="d-flex">
                    <TokenSelect onChange={e => setToken(e.target.value)}>
                        <option value="WCI">WCI</option>
                        <option value="ETH">ETH</option>
                    </TokenSelect>
                </div>
                { type === 'betting' &&
                    <NumberCardContainer>
                        <NumberCard>
                            <div>
                                <span>{days}</span>
                            </div>
                            <span>DAYS</span>
                        </NumberCard>
                        <NumberCard>
                            <div>
                                <span>{hours}</span>
                            </div>
                            <span>HRS</span>
                        </NumberCard>
                        <NumberCard>
                            <div>
                                <span>{minutes}</span>
                            </div>
                            <span>MINS</span>
                        </NumberCard>
                        <NumberCard>
                            <div>
                                <span>{seconds}</span>
                            </div>
                            <span>SECS</span>
                        </NumberCard>
                    </NumberCardContainer>
                }
            </MatchCardHeader>
            <MatchCardBody>
                { type === 'betting' || type === 'reviewing' ?
                    <MatchCardBodyHeader>
                        { token === "ETH" ?
                            <span>{totalBet} ETH POOL</span> :
                            <span>{totalBetWci} WCI POOL</span>
                        }
                    </MatchCardBodyHeader> :
                    <MatchCardClaimButton onClick={() => onClaim(matchId, token)}>
                        <span>CLAIM</span>
                    </MatchCardClaimButton>
                }
                
                <MatchScore>
                    <MatchScoreLogo>
                        <img src={team1Logo} />
                        <p>{team1Abbr}</p>
                    </MatchScoreLogo>
                    <MatchScoreMark>
                        <span className={type === 'claiming' && team1Score > team2Score ? 'win-rt' : type === 'claiming' && team1Score < team2Score ? 'lose-rt' : ''}>{team1Score}</span>
                        <span>-</span>
                        <span className={type === 'claiming' && team1Score < team2Score ? 'win-rt' : type === 'claiming' && team1Score > team2Score ? 'lose-rt' : ''}>{team2Score}</span>
                    </MatchScoreMark>
                    <MatchScoreLogo>
                        <img src={team2Logo} />
                        <p>{team2Abbr}</p>
                    </MatchScoreLogo>
                </MatchScore>
                { account ? type === 'betting' ?
                    <BetCardContainer2>
                        <div>
                            <BetCard>
                                { token === 'ETH' ?
                                    <>
                                        <button onClick={() => onBet(matchId, 0, token)} disabled={checkBetStarted() ? true : false}>
                                            <span>{team1Abbr}</span>
                                            <span className="score">x{team1Multi}</span>
                                        </button>    
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team1Bet}</span>
                                        </div>
                                        <div>
                                            <span>Win:</span>
                                            <span className="score">{team1Win}</span>
                                        </div>                        
                                    </> :
                                    <>
                                        { wciAllowed ?
                                            <button onClick={() => onBet(matchId, 0, token)} disabled={checkBetStarted() ? true : false}>
                                                <span>{team1Abbr}</span>
                                                <span className="score">x{team1MultiWci}</span>
                                            </button> :
                                            <button onClick={approveWci}>
                                                <span className="w-100 text-center">Approve</span>
                                            </button>
                                        }
                                    
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team1BetWci}</span>
                                        </div>
                                        <div>
                                            <span>Win:</span>
                                            <span className="score">{team1WinWci}</span>
                                        </div>                        
                                    </>
                                }
                            </BetCard>
                        </div>
                        <div>
                            <BetCard>
                                { token === 'ETH' ?
                                    <>
                                        <button onClick={() => onBet(matchId, 2, token)} disabled={checkBetStarted() ? true : false}>
                                            <span>{team2Abbr}</span>
                                            <span className="score">x{team2Multi}</span>
                                        </button>
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team2Bet}</span>
                                        </div>
                                        <div>
                                            <span>Win:</span>
                                            <span className="score">{team2Win}</span>
                                        </div>
                                    </> :
                                    <>
                                        { wciAllowed ?
                                            <button onClick={() => onBet(matchId, 2, token)} disabled={checkBetStarted() ? true : false}>
                                                <span>{team2Abbr}</span>
                                                <span className="score">x{team2MultiWci}</span>
                                            </button> :
                                            <button onClick={approveWci}>
                                                <span className="w-100 text-center">Approve</span>
                                            </button>
                                        }
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team2BetWci}</span>
                                        </div>
                                        <div>
                                            <span>Win:</span>
                                            <span className="score">{team2WinWci}</span>
                                        </div>                   
                                    </>
                                }
                            </BetCard>
                        </div>
                    </BetCardContainer2> :
                    <BetCardContainer2>
                        <div>
                            <BetCard className={type === 'claiming' && betResult === 0 ? 'success-rt' : type === 'claiming' && betResult !== 0 ? 'fail-rt' : ''}>
                                { token === 'ETH' ?
                                    <>
                                        <div className="multi-div-rt">
                                            <span>{team1Abbr}</span>
                                            <span className="score">x{team1Multi}</span>
                                        </div>
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team1Bet}</span>
                                        </div>
                                        <div className="win-amount-rt">
                                            <span>Win:</span>
                                            <span className="score">{team1Win}</span>
                                        </div>
                                    </> :
                                    <>
                                        <div className="multi-div-rt">
                                            <span>{team1Abbr}</span>
                                            <span className="score">x{team1MultiWci}</span>
                                        </div>
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team1BetWci}</span>
                                        </div>
                                        <div className="win-amount-rt">
                                            <span>Win:</span>
                                            <span className="score">{team1WinWci}</span>
                                        </div>
                                    </>
                                }
                            </BetCard>
                        </div>
                        <div>
                            <BetCard className={type === 'claiming' && betResult === 2 ? 'success-rt' : type === 'claiming' && betResult !== 2 ? 'fail-rt' : ''}>
                                { token === 'ETH' ?
                                    <>
                                        <div className="multi-div-rt">
                                            <span>{team2Abbr}</span>
                                            <span className="score">x{team2Multi}</span>
                                        </div>
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team2Bet}</span>
                                        </div>
                                        <div className="win-amount-rt">
                                            <span>Win:</span>
                                            <span className="score">{team2Win}</span>
                                        </div>
                                    </> :
                                    <>
                                        <div className="multi-div-rt">
                                            <span>{team2Abbr}</span>
                                            <span className="score">x{team2MultiWci}</span>
                                        </div>
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{team2BetWci}</span>
                                        </div>
                                        <div className="win-amount-rt">
                                            <span>Win:</span>
                                            <span className="score">{team2WinWci}</span>
                                        </div>
                                    </>
                                }
                            </BetCard>
                        </div>
                    </BetCardContainer2> :
                    <></>
                }
            </MatchCardBody>
        </MatchCardContainer>
    )
}

export default MatchCardOvertime;