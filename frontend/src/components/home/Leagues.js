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
    const [tabItems, setTabItems] = useState([]);

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
        let tmpAllLive = [];
        let tmpAllUpcoming = [];
        let tmpAllCompleted = [];
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

            if (status === 2) {
                tmpAllCompleted.push(item);
            } else if (status === 1) {
                tmpAllUpcoming.push(item);
            } else if (status === 0) {
                tmpAllLive.push(item);
            }

            if (type === 'uefa') {
                if (status === 2) {
                    tmpECompleted.push(item);
                } else if (status === 1) {
                    tmpEUpcoming.push(item);
                } else if (status === 0) {
                    tmpELive.push(item);
                }
            } else if (type === "uefa_e") {
                if (status === 2) {
                    tmpEECompleted.push(item);
                } else if (status === 1) {
                    tmpEEUpcoming.push(item);
                } else if (status === 0) {
                    tmpEELive.push(item);
                }
            } else if (type === "english_p") {
                if (status === 2) {
                    tmpEnCompleted.push(item);
                } else if (status === 1) {
                    tmpEnUpcoming.push(item);
                } else if (status === 0) {
                    tmpEnLive.push(item);
                }
            } else if (type === 'worldcup') {
                if (status === 2) {
                    tmpWCompleted.push(item);
                } else if (status === 1) {
                    tmpWUpcoming.push(item);
                } else if (status === 0) {
                    tmpWLive.push(item);
                }
            }
        }

        let tmpTabItems = [
            {
                tabId: "id-all-bets-nav-item",
                contentId: "id-all-bets",
                tabContent: "All",
                contentTitle: "All Matches",
                matchData: [tmpAllLive, tmpAllUpcoming, tmpAllCompleted]
            },
            {
                tabId: "id-uefa-champion-bets-nav-item",
                contentId: "id-uefa-champion-bets",
                tabContent: "UEFA",
                contentTitle: "UEFA Champion League",
                matchData: [tmpELive, tmpEUpcoming, tmpECompleted]
            },
            {
                tabId: "id-uefa-bets-nav-item",
                contentId: "id-uefa-bets",
                tabContent: "Europa",
                contentTitle: "UEFA Europa League",
                matchData: [tmpEELive, tmpEEUpcoming, tmpEECompleted]
            },
            {
                tabId: "id-english-bets-nav-item",
                contentId: "id-english-bets",
                tabContent: "EPL",
                contentTitle: "English Premier League",
                matchData: [tmpEnLive, tmpEnUpcoming, tmpEnCompleted]
            },
            {
                tabId: "id-worldcup-bets-nav-item",
                contentId: "id-worldcup-bets",
                tabContent: "Worldcup",
                contentTitle: "Worldcup Bets",
                matchData: [tmpWLive, tmpWUpcoming, tmpWCompleted]
            },
        ];

        tmpTabItems = tmpTabItems.sort((a, b) => {
            if (a.matchData[0].length > b.matchData[0].length) return -1;
            else return 1;
        })

        setTabItems(tmpTabItems);
    }, [matchData, betStatus]);

    return (
        <section className="dashboard-content pt-2">
            <div className="overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="dashboard-heading-rt dashboard-heading p-3 w-100">
                                <ul className="nav league-nav-rt" role="tablist">
                                    { tabItems.map((ele, index) => (
                                        <TabItem className={`nav-link${index === 0 ? ' active' : ''}`} id={ele.tabId} dataTarget={ele.contentId} key={index}>
                                            {ele.tabContent}
                                        </TabItem>    
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    { tabItems.map((ele, index) => (
                        <LeaguesTabContent
                            key={index}
                            id={ele.contentId}
                            hiddenBy={ele.tabId}
                            show={index === 0}
                            active={index === 0}
                            title={ele.contentTitle}
                            matchData={ele.matchData}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Leagues;