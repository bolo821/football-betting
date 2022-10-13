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

    const [wMatchData, setWMatchData] = useState([]);
    const [eMatchData, setEMatchData] = useState([]);
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
        let timerId = setInterval(() => {
            let tmpW = wMatchData.map(ele => {
                let diff = getTimeDifference(new Date(), ele.time);
                return {
                    ...ele,
                    days: diff.day,
                    hours: diff.hour,
                    mins: diff.minute,
                    secs: diff.second,
                }
            });

            let tmpE = eMatchData.map(ele => {
                let diff = getTimeDifference(new Date(), ele.time);
                return {
                    ...ele,
                    days: diff.day,
                    hours: diff.hour,
                    mins: diff.minute,
                    secs: diff.second,
                }
            });
            if (timer) {
                setWMatchData(tmpW);
                setEMatchData(tmpE);
            }
        });

        timer = timerId;

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, []);

    useEffect(() => {
        let tmpWLive = [];
        let tmpWCompleted = [];
        let tmpELive = [];
        let tmpECompleted = [];

        for (let i=0; i<matches.length; i++) {
            if (matches[i].matchType === 'uefa') {
                if (betStatus[matches[i].matchId] === 2) {
                    tmpECompleted.push({
                        ...matches[i],
                        id: matches[i].matchId,
                        team1: matches[i].team1Name,
                        team2: matches[i].team2Name,
                        time: matches[i].matchTime,
                        days: '00',
                        hours: '00',
                        mins: '00',
                        secs: '00',
                    });
                } else {
                    tmpELive.push({
                        ...matches[i],
                        id: matches[i].matchId,
                        team1: matches[i].team1Name,
                        team2: matches[i].team2Name,
                        time: matches[i].matchTime,
                        days: '00',
                        hours: '00',
                        mins: '00',
                        secs: '00',
                    });
                }
            } else if (matches[i].matchType === 'worldcup') {
                if (betStatus[matches[i].matchId] === 2) {
                    tmpWCompleted.push({
                        ...matches[i],
                        id: matches[i].matchId,
                        team1: matches[i].team1Name,
                        team2: matches[i].team2Name,
                        time: matches[i].matchTime,
                        days: '00',
                        hours: '00',
                        mins: '00',
                        secs: '00',
                    });
                } else {
                    tmpWLive.push({
                        ...matches[i],
                        id: matches[i].matchId,
                        team1: matches[i].team1Name,
                        team2: matches[i].team2Name,
                        time: matches[i].matchTime,
                        days: '00',
                        hours: '00',
                        mins: '00',
                        secs: '00',
                    });
                }
            }
        }

        setELive(tmpELive);
        setECompleted(tmpECompleted);
        setWLive(tmpWLive);
        setWCompleted(tmpWCompleted);
    }, [matches, betStatus]);

    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">
                <div className="dashboard-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12">
                                <ul className="nav league-nav-rt" role="tablist">
                                    <TabItem className="nav-link active" id="id-uefa-bets-nav-ietm" dataTarget="id-uefa-bets">
                                        UEFA BETS
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
                        title="UEFA Champions League"
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