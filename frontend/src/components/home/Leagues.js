import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LeaguesTabContent from '../home/LeaguesTabContent';
import TabItem from '../TabItem';
import {
    getSingleInformation,
    getTripleInformation,
    getBetStatsData,
    getMatch,
    getAllowance as getWciAllowance,
    getCollaterals,
    getUSDTAllowance,
    getUSDCAllowance,
    getSHIBAllowance,
    getDOGEAllowance,
    updateMatch,
    getReferralData,
} from '../../actions';
import { getTimeDifference } from '../../utils/helper';

var timer = null;

const Leagues = () => {
    const dispatch = useDispatch();
    const matches = useSelector(state => state.match.matches);
    const { totalBets, totalBetsWci } = useSelector(state => state.transaction);

    const { account } = useWeb3React();

    const [matchData, setMatchData] = useState(matches);
    const [tabItems, setTabItems] = useState([]);

    useEffect(() => {
        dispatch(getBetStatsData());
        dispatch(getMatch());
    }, []);

    useEffect(() => {
        if (account) {
            dispatch(getWciAllowance(account));
            dispatch(getSingleInformation(account, 0));
            dispatch(getTripleInformation(account, 0));
            dispatch(getSingleInformation(account, 1));
            dispatch(getTripleInformation(account, 1));
            dispatch(getCollaterals(account));
            dispatch(getUSDTAllowance(account));
            dispatch(getUSDCAllowance(account));
            dispatch(getSHIBAllowance(account));
            dispatch(getDOGEAllowance(account));
            dispatch(getReferralData(account));
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
        let tmpELive = [];
        let tmpECompleted = [];
        let tmpEUpcoming = [];
        let tmpEELive = [];
        let tmpEECompleted = [];
        let tmpEEUpcoming = [];
        let tmpEnLive = [];
        let tmpEnCompleted = [];
        let tmpEnUpcoming = [];
        let tmpLaLive = [];
        let tmpLaUpcoming = [];
        let tmpLaCompleted = [];
        let tmpWLive = [];
        let tmpWUpcoming = [];
        let tmpWCompleted = [];

        for (let i=0; i<matchData.length; i++) {
            let matchId = matchData[i].matchId;
            let status = matchData[i].matchStatus;
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
            } else if (type === 'laliga') {
                if (status === 2) {
                    tmpLaCompleted.push(item);
                } else if (status === 1) {
                    tmpLaUpcoming.push(item);
                } else if (status === 0) {
                    tmpLaLive.push(item);
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
                tabId: "id-laliga-nav-item",
                contentId: "id-laliga-bets",
                tabContent: "LaLiga",
                contentTitle: "La Liga Matches",
                matchData: [tmpLaLive, tmpLaUpcoming, tmpLaCompleted]
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
    }, [matchData]);

    useEffect(() => {
        if (matches.length === totalBets.length) {
            for (let i=0; i<totalBets.length; i++) {
                if (totalBets[i] !== matches[i].totalBet) {
                    dispatch(updateMatch(matches[i].matchId, { totalBet: totalBets[i] }));
                }
            }
        }
    }, [totalBets, matches]);

    useEffect(() => {
        if (matches.length === totalBetsWci.length) {
            for (let i=0; i<totalBetsWci.length; i++) {
                if (totalBetsWci[i] !== matches[i].totalBetWci) {
                    dispatch(updateMatch(matches[i].matchId, { totalBetWci: totalBetsWci[i] }));
                }
            }
        }
    }, [totalBetsWci, matches]);

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