import React, { useState } from 'react';
import { 
    MatchCard as MatchCardContainer,
    MatchCardHeader,
    TokenSelect,
    MultiplierSelect,
    MatchCardBody,
    MatchCardBodyHeader,
    MatchScore,
    MatchScoreLogo,
    MatchScoreMark,
    BetCard,
    MatchCardClaimButton,
    BetContent2,
    BetCardContainer2,
    BetCardContainer
} from './MatchCardElements';
import { useWeb3React } from '@web3-react/core';

const MatchCardGeneral3 = props => {
    const {
        type, // one of betting, reviewing, claiming and upcoming.
        matchId,
        team1Logo, team2Logo, team1Abbr, team2Abbr, drawAbbr, betContent,
        team1Score, team2Score,
        totalBet, totalBetWci,
        team1Bet, team1Win, team1Multi, team1BetWci, team1WinWci, team1MultiWci,
        team2Bet, team2Win, team2Multi, team2BetWci, team2WinWci, team2MultiWci,
        drawBet, drawWin, drawMulti, drawBetWci, drawWinWci, drawMultiWci,
        onBet, onClaim,
        betResult,
        wciAllowed, approveWci,
    } = props;
    const { account } = useWeb3React();
    const [token, setToken] = useState('WCI');
    const [multiplier, setMultiplier] = useState(1);

    return (
        <MatchCardContainer>
            <MatchCardHeader>
                <div className="d-flex">
                    <TokenSelect onChange={e => setToken(e.target.value)}>
                        <option value="WCI">WCI</option>
                        <option value="ETH">ETH</option>
                    </TokenSelect>
                    { token === 'ETH' &&
                        <MultiplierSelect onChange={e => setMultiplier(e.target.value)}>
                            <option value="1">x1</option>
                            <option value="2">x2</option>
                            <option value="3">x3</option>
                        </MultiplierSelect>
                    }
                </div>
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
                
                <BetContent2>
                    {betContent}
                </BetContent2>
                { account ? type === 'betting' ?
                    <BetCardContainer>
                        <div>
                            <BetCard>
                                { token === 'ETH' ?
                                    <>
                                        <button onClick={() => onBet(matchId, 0, token, multiplier)}>
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
                                            <button onClick={() => onBet(matchId, 0, token, 1)}>
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
                                        <button onClick={() => onBet(matchId, 1, token, multiplier)}>
                                            <span>{drawAbbr}</span>
                                            <span className="score">x{drawMulti}</span>
                                        </button>   
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{drawBet}</span>
                                        </div>
                                        <div>
                                            <span>Win:</span>
                                            <span className="score">{drawWin}</span>
                                        </div>
                                    </> :
                                    <>
                                        { wciAllowed ?
                                            <button onClick={() => onBet(matchId, 1, token, 1)}>
                                                <span>{drawAbbr}</span>
                                                <span className="score">x{drawMultiWci}</span>
                                            </button> :
                                            <button onClick={approveWci}>
                                                <span className="w-100 text-center">Approve</span>
                                            </button>
                                        }
                                    
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{drawBetWci}</span>
                                        </div>
                                        <div>
                                            <span>Win:</span>
                                            <span className="score">{drawWinWci}</span>
                                        </div>                      
                                    </>
                                }
                            </BetCard>
                        </div>
                        <div>
                            <BetCard>
                                { token === 'ETH' ?
                                    <>
                                        <button onClick={() => onBet(matchId, 2, token, multiplier)}>
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
                                            <button onClick={() => onBet(matchId, 2, token, 1)}>
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
                    </BetCardContainer> :
                    <BetCardContainer>
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
                            <BetCard className={type === 'claiming' && betResult === 1 ? 'success-rt' : type === 'claiming' && betResult !== 1 ? 'fail-rt' : ''}>
                                { token === 'ETH' ?
                                    <>
                                        <div className="multi-div-rt">
                                            <span>{drawAbbr}</span>
                                            <span className="score">x{drawMulti}</span>
                                        </div>
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{drawBet}</span>
                                        </div>
                                        <div className="win-amount-rt">
                                            <span>Win:</span>
                                            <span className="score">{drawWin}</span>
                                        </div>
                                    </> :
                                    <>
                                        <div className="multi-div-rt">
                                            <span>{drawAbbr}</span>
                                            <span className="score">x{drawMultiWci}</span>
                                        </div>
                                        <div>
                                            <span>Bet:</span>
                                            <span className="score">{drawBetWci}</span>
                                        </div>
                                        <div className="win-amount-rt">
                                            <span>Win:</span>
                                            <span className="score">{drawWinWci}</span>
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
                    </BetCardContainer> :
                    <></>
                }
            </MatchCardBody>
        </MatchCardContainer>
    )
}

export default MatchCardGeneral3;