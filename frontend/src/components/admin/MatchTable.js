import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { getTimeString } from '../../utils/helper';
import StatusModal from './StatusModal';
import ResultModal from './ResultModal';
import { setBetStatus, setBetResult, withdrawMatchProfit } from '../../actions';

var team1 = '';
var team2 = '';
var matchId = -1;

const MatchTable = props => {
    const { data, type } = props;
    const dispatch = useDispatch();
    const { account } = useWeb3React();
    const betStatus = useSelector(state => state.transaction.betStatus);
    const betResult = useSelector(state => state.transaction.betResult);

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);

    const setMatchStatus = status => {
        dispatch(setBetStatus(account, matchId, status, () => {
            setShowStatusModal(false);
        }));
    }

    const setMatchResult = status => {
        dispatch(setBetResult(account, matchId, status, () => {
            setShowResultModal(false);
        }));
    }

    const withdrawProfit = mId => {
        dispatch(withdrawMatchProfit(account, mId));
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
                                            <th>{ele.team1} / {ele.team2}</th>
                                            <td>{getTimeString(ele.time)}</td>
                                            <td>{betStatus[ele.id] === 0 ? 'Betting' : betStatus[ele.id] === 1 ? 'Reviewing' : 'Claiming'}</td>
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
                                                <button
                                                    type="button"
                                                    className="cmn-btn reg set-bn-rt"
                                                    onClick={() => {matchId = ele.id; setShowResultModal(true); team1=ele.team1; team2=ele.team2}}
                                                >
                                                    Set Result
                                                </button>
                                            </td>
                                            { type === 'completed' &&
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="cmn-btn reg set-bn-rt"
                                                        onClick={() => withdrawProfit(ele.id)}
                                                    >
                                                        Withdraw Profit
                                                    </button>
                                                </td>
                                            } 
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
            <StatusModal isOpen={showStatusModal} setIsOpen={setShowStatusModal} setMatchStatus={setMatchStatus} />
            <ResultModal isOpen={showResultModal} setIsOpen={setShowResultModal} setMatchResult={setMatchResult} team1={team1} team2={team2} />
        </section>
    )
}

export default MatchTable;