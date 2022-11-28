import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { getDateTimeString } from '../../utils/helper';
import StatusModal from './StatusModal';
import ResultModal from './ResultModal';
import ResultModal2 from './ResultModal2';
import { setBetStatus, setBetResult } from '../../actions';

var team1 = '';
var team2 = '';
var matchId = -1;
var betContent = '';

const MatchTable = props => {
    const { data, type, matchType } = props;
    const dispatch = useDispatch();
    const { account } = useWeb3React();
    const betStatus = useSelector(state => state.transaction.betStatus);
    const betResult = useSelector(state => state.transaction.betResult);

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showResultModal2, setShowResultModal2] = useState(false);
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);

    const setMatchStatus = status => {
        dispatch(setBetStatus(account, matchId, status, 'match', () => {
            setShowStatusModal(false);
        }));
    }

    const setMatchStatus2 = status => {
        dispatch(setBetStatus(account, matchId, status, 'event', () => {
            setShowStatusModal(false);
        }));
    }

    const setMatchResult = result => {
        dispatch(setBetResult(account, {
            matchId,
            result: result,
            team1Score,
            team2Score,
            isMainMatch: true,
        }, () => {
            setShowResultModal(false);
            setTeam1Score(0);
            setTeam2Score(0);
        }));
    }

    const setMatchResult2 = result => {
        dispatch(setBetResult(account, {
            matchId,
            result: result,
            isMainMatch: false,
        }, () => {
            setShowResultModal2(false);
        }));
    }

    return (
        <section className="bet-this-game all-soccer-bets bets-2 section2-rt">
            <div className="pb-120 bet-part-rt">
                <div className="container">
                    { data.length > 0 ?
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Match</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Status</th>
                                        { type === 'completed' &&
                                            <th scope="col">Result</th>
                                        }
                                        
                                        <th scope="col">Set Status</th>
                                        <th scope="col">Set Result</th>
                                        { type === 'completed' &&
                                            <th scope="col">Withdraw profit</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    { data.map((ele, index) => (
                                        <tr key={index}>
                                            { matchType === 'match' ?
                                                <td>{ele.team1} / {ele.team2}</td> :
                                                <td>{ele.betContent}</td>
                                            }
                                            <td>{getDateTimeString(ele.time)}</td>
                                            <td>{betStatus[ele.id] === 0 ? 'Betting' : betStatus[ele.id] === 1 ? 'In Play' : 'Claiming'}</td>
                                            { type === 'completed' &&
                                                <td>{betResult[ele.id] === 0 ? `${ele.team1} won` : betResult[ele.id] === 1 ? 'Drew' : `${ele.team2} won`}</td>
                                            }
                                            <td>
                                                <button
                                                    type="button"
                                                    className="cmn-btn reg set-bn-rt"
                                                    onClick={() => {matchId = ele.id; setShowStatusModal(true);}}
                                                >
                                                    Set Status
                                                </button>
                                            </td>
                                            <td>
                                                { matchType === 'match' ?
                                                    <button
                                                        type="button"
                                                        className="cmn-btn reg set-bn-rt"
                                                        onClick={() => {matchId = ele.id; setShowResultModal(true); team1=ele.team1; team2=ele.team2}}
                                                    >
                                                        Set Result
                                                    </button> :
                                                    <button
                                                        type="button"
                                                        className="cmn-btn reg set-bn-rt"
                                                        onClick={() => {
                                                            matchId = ele.id;
                                                            betContent = ele.betContent;
                                                            setShowResultModal2(true);
                                                        }}
                                                    >
                                                        Set Result
                                                    </button>
                                                }
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> :
                        <div className="d-flex w-100 justify-content-center bottom-area mt-60">
                            <h5>No matches to display.</h5>
                        </div>
                    }
                </div>
            </div>
            <StatusModal
                isOpen={showStatusModal}
                setIsOpen={setShowStatusModal}
                setMatchStatus={setMatchStatus}
                setMatchStatus2={setMatchStatus2}
                matchType={matchType}
            />
            <ResultModal
                isOpen={showResultModal}
                setIsOpen={setShowResultModal}
                setMatchResult={setMatchResult}
                team1={team1} team2={team2}
                team1Score={team1Score} setTeam1Score={setTeam1Score}
                team2Score={team2Score} setTeam2Score={setTeam2Score}
            />
            <ResultModal2
                isOpen={showResultModal2}
                setIsOpen={setShowResultModal2}
                setMatchResult={setMatchResult2}
                betContent={betContent}
            />
        </section>
    )
}

export default MatchTable;