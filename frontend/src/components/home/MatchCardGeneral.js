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
    BetContent,
    BetCardContainer2,
} from './MatchCardElements';
import { useWeb3React } from '@web3-react/core';

const MatchCardGeneral = props => {
    const {
        type, // one of betting, reviewing, claiming and upcoming.
        matchId,
        team1Logo, team2Logo, team1Abbr, team2Abbr, betContent,
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
                <BetContent>
                    {betContent}
                </BetContent>
                { account ? type === 'betting' ?
                    <BetCardContainer2>
                        <div>
                            <BetCard>
                                { token === 'ETH' ?
                                    <>
                                        <button onClick={() => onBet(matchId, 0, token, multiplier)}>
                                            <span>YES</span>
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
                                                <span>YES</span>
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
                                        <button onClick={() => onBet(matchId, 2, token, multiplier)}>
                                            <span>NO</span>
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
                                                <span>NO</span>
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
                                            <span>YES</span>
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
                                            <span>NO</span>
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
                                            <span>YES</span>
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
                                            <span>NO</span>
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

export default MatchCardGeneral;