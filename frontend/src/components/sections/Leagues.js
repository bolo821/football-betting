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
    const [eeLive, setEELive] = useState([]);
    const [eeUpcoming, setEEUpcoming] = useState([]);
    const [eeCompleted, setEECompleted] = useState([]);
    const [enLive, setEnLive] = useState([]);
    const [enUpcoming, setEnUpcoming] = useState([]);
    const [enCompleted, setEnCompleted] = useState([]);

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
        let tmpEELive = [];
        let tmpEECompleted = [];
        let tmpEEUpcoming = [];
        let tmpEnLive = [];
        let tmpEnCompleted = [];
        let tmpEnUpcoming = [];

        for (let i=0; i<matchData.length; i++) {
            let matchId = matchData[i].matchId;
            let status = betStatus[matchId];
            let type = matchData[i].matchType;
            let item = {
                ...matchData[i],
                id: matchId,
                team1: matchData[i].team1Name,
                team2: matchData[i].team2Name,
                time: matchData[i].matchTime,
            };

            if (type === 'uefa') {
                if (status === 2) {
                    tmpECompleted.push(item);
                } else if (status === 1) {
                    tmpEUpcoming.push(item);
                } else {
                    tmpELive.push(item);
                }
            } else if (type === "uefa_e") {
                if (status === 2) {
                    tmpEECompleted.push(item);
                } else if (status === 1) {
                    tmpEEUpcoming.push(item);
                } else {
                    tmpEELive.push(item);
                }
            } else if (type === "english_p") {
                if (status === 2) {
                    tmpEnCompleted.push(item);
                } else if (status === 1) {
                    tmpEnUpcoming.push(item);
                } else {
                    tmpEnLive.push(item);
                }
            } else if (type === 'worldcup') {
                if (status === 2) {
                    tmpWCompleted.push(item);
                } else if (status === 1) {
                    tmpWUpcoming.push(item);
                } else {
                    tmpWLive.push(item);
                }
            }
        }

        setELive(tmpELive);
        setEUpcoming(tmpEUpcoming);
        setECompleted(tmpECompleted);
        setWLive(tmpWLive);
        setWCompleted(tmpWCompleted);
        setWUpcoming(tmpWUpcoming);
        setEELive(tmpEELive);
        setEEUpcoming(tmpEEUpcoming);
        setEECompleted(tmpEECompleted);
        setEnLive(tmpEnLive);
        setEnUpcoming(tmpEnUpcoming);
        setEnCompleted(tmpEnCompleted);
    }, [matchData, betStatus]);

    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">
                <div className="dashboard-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12">
                                <ul className="nav league-nav-rt" role="tablist">
                                    <TabItem className="nav-link active" id="id-uefa-champion-bets-nav-item" dataTarget="id-uefa-champion-bets">
                                        UEFA Champion
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-uefa-bets-nav-item" dataTarget="id-uefa-bets">
                                        UEFA Europa
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-english-bets-nav-item" dataTarget="id-english-bets">
                                        English Premier
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-worldcup-bets-nav-item" dataTarget="id-worldcup-bets">
                                        Worldcup
                                    </TabItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <LeaguesTabContent
                        id="id-uefa-champion-bets"
                        hiddenBy="id-uefa-champion-bets-nav-item"
                        show={true}
                        active={true}
                        title="UEFA Champion League"
                        matchData={[eLive, eUpcoming, eCompleted]}
                    />
                    <LeaguesTabContent
                        id="id-uefa-bets"
                        hiddenBy="id-uefa-bets-nav-item"
                        show={false}
                        active={false}
                        title="UEFA Europa League"
                        matchData={[eeLive, eeUpcoming, eeCompleted]}
                    />
                    <LeaguesTabContent
                        id="id-english-bets"
                        hiddenBy="id-english-bets-nav-item"
                        show={false}
                        active={false}
                        title="English Premier League"
                        matchData={[enLive, enUpcoming, enCompleted]}
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