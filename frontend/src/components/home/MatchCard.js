import React from 'react';
import { 
    MatchCard as MatchCardContainer,
    MatchCardHeader,
    TokenType,
    NumberCardContainer,
    NumberCard,
    MatchCardBody,
    MatchCardBodyHeader,
    MatchScore,
    MatchScoreLogo,
    MatchScoreMark,
    BetCardContainer,
    BetCard,
    MatchCardClaimButton,
} from './MatchCardElements';
import { useWeb3React } from '@web3-react/core';

const MatchCard = props => {
    const {
        type, // one of betting, reviewing, claiming and upcoming.
        days, hours, minutes, seconds,
        totalBet, team1Logo, team2Logo, team1Abbr, team2Abbr,
        team1Score, team2Score,
        team1Bet, team1Win, team1Multi,
        team2Bet, team2Win, team2Multi,
        drawBet, drawWin, drawMulti,
        onTeam1Bet, onTeam2Bet, onDrawBet,
        betResult,
    } = props;
    const { account } = useWeb3React();

    return (
        <MatchCardContainer>
            <MatchCardHeader>
                <TokenType>
                    <span>ETH</span>
                </TokenType>
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
                        <span>{totalBet} ETH POOL</span>
                    </MatchCardBodyHeader> :
                    <MatchCardClaimButton>
                        <span>CLAIM</span>
                    </MatchCardClaimButton>
                }
                
                <MatchScore>
                    <MatchScoreLogo>
                        <img src={team1Logo} />
                    </MatchScoreLogo>
                    <MatchScoreMark>
                        <span className={type === 'claiming' && betResult === 0 ? 'win-rt' : type === 'claiming' && betResult !== 0 ? 'lose-rt' : ''}>{team1Score}</span>
                        <span>-</span>
                        <span className={type === 'claiming' && betResult === 2 ? 'win-rt' : type === 'claiming' && betResult !== 2 ? 'lose-rt' : ''}>{team2Score}</span>
                    </MatchScoreMark>
                    <MatchScoreLogo>
                        <img src={team2Logo} />
                    </MatchScoreLogo>
                </MatchScore>
                { account ? type === 'betting' ?
                    <BetCardContainer>
                        <div>
                            <BetCard>
                                <button onClick={onTeam1Bet}>
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
                            </BetCard>
                        </div>
                        <div>
                            <BetCard>
                                <button onClick={onDrawBet}>
                                    <span>Draw</span>
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
                            </BetCard>
                        </div>
                        <div>
                            <BetCard>
                                <button onClick={onTeam2Bet}>
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
                            </BetCard>
                        </div>
                    </BetCardContainer> :
                 type === 'reviewing' ?
                    <div className="bottom-item d-flex justify-content-center w-100 py-4 text-white">
                        This match is under review. You can't bet or claim for now.
                    </div> :
                    <BetCardContainer>
                        <div>
                            <BetCard className={type === 'claiming' && betResult === 0 ? 'success-rt' : type === 'claiming' && betResult !== 0 ? 'fail-rt' : ''}>
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
                            </BetCard>
                        </div>
                        <div>
                            <BetCard className={type === 'claiming' && betResult === 1 ? 'success-rt' : type === 'claiming' && betResult !== 1 ? 'fail-rt' : ''}>
                                <div className="multi-div-rt">
                                    <span>Draw</span>
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
                            </BetCard>
                        </div>
                        <div>
                            <BetCard className={type === 'claiming' && betResult === 2 ? 'success-rt' : type === 'claiming' && betResult !== 2 ? 'fail-rt' : ''}>
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
                            </BetCard>
                        </div>
                    </BetCardContainer> :
                    <></>
                }
            </MatchCardBody>
        </MatchCardContainer>
    )
}

export default MatchCard;