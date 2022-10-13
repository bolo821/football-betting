import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LeaguesTabContent from '../home/LeaguesTabContent';
import TabItem from '../TabItem';
import { getEarnings, getMultipliers, getBetResult, getBetStatus, getBetAmount, getTotalBet, getClaimHistory, getBetStatsData, getMatch } from '../../actions';
import { getTimeDifference } from '../../utils/helper';

var timer = null;

const Leagues = () => {
    const dispatch = useDispatch();
    const betStatus = useSelector(state => state.transaction.betStatus);
    const matches = useSelector(state => state.match.matches);

    const { account } = useWeb3React();

    const [matchData, setMatchData] = useState(matches);
    const [wLive, setWLive] = useState([]);
    const [wUpcoming, setWUpcoming] = useState([]);
    const [wCompleted, setWCompleted] = useState([]);
    const [eLive, setELive] = useState([]);
    const [eUpcoming, setEUpcoming] = useState([]);
    const [eCompleted, setECompleted] = useState([]);

    useEffect(() => {
        dispatch(getBetStatus());
        dispatch(getMultipliers());
        dispatch(getBetResult());
        dispatch(getTotalBet());
        dispatch(getBetStatsData());
        dispatch(getMatch());
    }, [dispatch]);
    
    useEffect(() => {
        if (account) {
            dispatch(getBetAmount(account));
            dispatch(getEarnings(account));
            dispatch(getClaimHistory(account));
        }
    }, [account]);

    useEffect(() => {
        if (timer){
            clearInterval(timer);
            timer = null;
        }

        let timerId = setInterval(() => {
            let tmp = matches.map(ele => {
                let diff = getTimeDifference(new Date(), ele.matchTime);
                return {
                    ...ele,
                    days: diff.day,
                    hours: diff.hour,
                    mins: diff.minute,
                    secs: diff.second,
                }
            });

            if (timer) {
                setMatchData(tmp);
            }
        });

        timer = timerId;

        return () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    }, [matches]);

    useEffect(() => {
        let tmpWLive = [];
        let tmpWUpcoming = [];
        let tmpWCompleted = [];
        let tmpELive = [];
        let tmpECompleted = [];
        let tmpEUpcoming = [];

        for (let i=0; i<matchData.length; i++) {
            if (matchData[i].matchType === 'uefa') {
                if (betStatus[matchData[i].matchId] === 2) {
                    tmpECompleted.push({
                        ...matchData[i],
                        id: matchData[i].matchId,
                        team1: matchData[i].team1Name,
                        team2: matchData[i].team2Name,
                        time: matchData[i].matchTime,
                    });
                } else if (betStatus[matchData[i].matchId] === 1) {
                    tmpEUpcoming.push({
                        ...matchData[i],
                        id: matchData[i].matchId,
                        team1: matchData[i].team1Name,
                        team2: matchData[i].team2Name,
                        time: matchData[i].matchTime,
                    });
                } else {
                    tmpELive.push({
                        ...matchData[i],
                        id: matchData[i].matchId,
                        team1: matchData[i].team1Name,
                        team2: matchData[i].team2Name,
                        time: matchData[i].matchTime,
                    });
                }
            } else if (matchData[i].matchType === 'worldcup') {
                if (betStatus[matchData[i].matchId] === 2) {
                    tmpWCompleted.push({
                        ...matchData[i],
                        id: matchData[i].matchId,
                        team1: matchData[i].team1Name,
                        team2: matchData[i].team2Name,
                        time: matchData[i].matchTime,
                    });
                } else if (betStatus[matchData[i].matchId] === 1) {
                    tmpWUpcoming.push({
                        ...matchData[i],
                        id: matchData[i].matchId,
                        team1: matchData[i].team1Name,
                        team2: matchData[i].team2Name,
                        time: matchData[i].matchTime,
                    });
                } else {
                    tmpWLive.push({
                        ...matchData[i],
                        id: matchData[i].matchId,
                        team1: matchData[i].team1Name,
                        team2: matchData[i].team2Name,
                        time: matchData[i].matchTime,
                    });
                }
            }
        }

        setELive(tmpELive);
        setECompleted(tmpECompleted);
        setWLive(tmpWLive);
        setWCompleted(tmpWCompleted);
        setEUpcoming(tmpEUpcoming);
        setWUpcoming(tmpWUpcoming);
    }, [matchData, betStatus]);

    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">
                <div className="dashboard-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12">
                                <ul className="nav league-nav-rt" role="tablist">
                                    <TabItem className="nav-link active" id="id-uefa-bets-nav-ietm" dataTarget="id-uefa-bets">
                                        UEFA Europa League
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-worldcup-bets-nav-item" dataTarget="id-worldcup-bets">
                                        Worldcup Bets
                                    </TabItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <LeaguesTabContent
                        id="id-uefa-bets"
                        hiddenBy="id-uefa-bets-nav-ietm"
                        show={true}
                        active={true}
                        title="UEFA Europa League"
                        matchData={[eLive, eUpcoming, eCompleted]}
                    />
                    <LeaguesTabContent
                        id="id-worldcup-bets"
                        hiddenBy="id-worldcup-bets-nav-item"
                        show={false}
                        active={false}
                        title="Worldcup Bets"
                        matchData={[wLive, wUpcoming, wCompleted]}
                    />
                </div>
            </div>
        </section>
    );
}

export default Leagues;