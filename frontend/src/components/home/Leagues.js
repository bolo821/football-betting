import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LeaguesTabContent from '../home/LeaguesTabContent';
import TabItem from '../TabItem';
import {
    getSingleInformation,
    getTripleInformation,
    getBetStatsData,
    getMatch,
    getEvent,
    getAllowance as getWciAllowance,
    getCollaterals,
    getUSDTAllowance,
    getUSDCAllowance,
    getSHIBAllowance,
    getDOGEAllowance,
    getReferralData,
    getLeaderboard,
} from '../../actions';
import { getTimeDifference } from '../../utils/helper';

var timer = null;
const tabTitles = {
    all: 'All',
    uefa: 'UFEA',
    uefa_e: 'Europa',
    english_p: 'EPL',
    laliga: 'LaLiga',
    worldcup: 'Matches',
}
const tabTitlesEvent = {
    all: 'All',
    uefa: 'UFEA',
    uefa_e: 'Europa',
    english_p: 'EPL',
    laliga: 'LaLiga',
    worldcup: 'Events',
}
const tabContentHeaders = {
    all: 'All Matches',
    uefa: 'UEFA Champion League',
    uefa_e: 'UEFA Europa League',
    english_p: 'English Premier League',
    laliga: 'La Liga Matches',
    worldcup: 'Worldcup Bets',
}

const Leagues = () => {
    const dispatch = useDispatch();
    const matches = useSelector(state => state.match.matches);
    const events = useSelector(state => state.event.events);

    const { account } = useWeb3React();

    const [matchData, setMatchData] = useState(matches);
    const [eventData, setEventData] = useState(events);
    const [tabItems, setTabItems] = useState([]);

    useEffect(() => {
        dispatch(getBetStatsData());
        dispatch(getMatch());
        dispatch(getEvent());
        dispatch(getLeaderboard());
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
        if (timer) {
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

            let tmpEvents = events.map(ele => {
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
                setEventData(tmpEvents);
            }
        });

        timer = timerId;

        return () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    }, [matches, events]);

    useEffect(() => {
        let tmpLeagues = {
            all: { live: [], inplay: [], completed: [] },
            uefa: { live: [], inplay: [], completed: [] },
            uefa_e: { live: [], inplay: [], completed: [] },
            english_p: { live: [], inplay: [], completed: [] },
            laliga: { live: [], inplay: [], completed: [] },
            worldcup: { live: [], inplay: [], completed: [] },
        }
        let tmpLeagueEvents = {
            all: { live: [], inplay: [], completed: [] },
            uefa: { live: [], inplay: [], completed: [] },
            uefa_e: { live: [], inplay: [], completed: [] },
            english_p: { live: [], inplay: [], completed: [] },
            laliga: { live: [], inplay: [], completed: [] },
            worldcup: { live: [], inplay: [], completed: [] },
        }

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

            let statusKey = status === 0 ? 'live' : status === 1 ? 'inplay' : 'completed';
            tmpLeagues['all'][statusKey].push(item); 
            tmpLeagues[type][statusKey].push(item);
        }

        for (let i=0; i<eventData.length; i++) {
            let matchId = eventData[i].matchId;
            let status = eventData[i].matchStatus;
            let type = eventData[i].matchType;
            let item = {
                ...eventData[i],
                id: matchId,
                team1: eventData[i].team1Name,
                team2: eventData[i].team2Name,
            };

            let statusKey = status === 0 ? 'live' : status === 1 ? 'inplay' : 'completed';
            tmpLeagueEvents['all'][statusKey].push(item); 
            tmpLeagueEvents[type][statusKey].push(item);
        }

        let tmpTabItems = Object.keys(tmpLeagues).map(leagueKey => {
            return {
                tabId: `id-${leagueKey}-bets-nav-item`,
                contentId: `id-${leagueKey}-bets`,
                tabContent: tabTitles[leagueKey],
                contentTitle: tabContentHeaders[leagueKey],
                matchData: [tmpLeagues[leagueKey]['live'], tmpLeagues[leagueKey]['inplay'], tmpLeagues[leagueKey]['completed']],
                type: 'match',
            }
        });

        let tmpTabItemsEvent = Object.keys(tmpLeagueEvents).map(leagueKey => {
            return {
                tabId: `id-${leagueKey}-events-bets-nav-item`,
                contentId: `id-${leagueKey}-events-bets`,
                tabContent: tabTitlesEvent[leagueKey],
                contentTitle: tabContentHeaders[leagueKey],
                matchData: [tmpLeagueEvents[leagueKey]['live'], tmpLeagueEvents[leagueKey]['inplay'], tmpLeagueEvents[leagueKey]['completed']],
                type: 'event',
            }
        });

        // tmpTabItems = tmpTabItems.sort((a, b) => {
        //     if (a.matchData[0].length > b.matchData[0].length) return -1;
        //     else return 1;
        // });

        setTabItems([tmpTabItems[5], tmpTabItemsEvent[5]]);
    }, [matchData, eventData]);

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
                            type={ele.type}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Leagues;