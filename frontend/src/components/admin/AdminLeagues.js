import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LeaguesTabContentAdmin from '../admin/LeaguesTabContentAdmin';
import TabItem from '../TabItem';
import { SOCKET } from '../../config/apis';

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
    const history = useHistory();
    const betStatus = useSelector(state => state.transaction.betStatus);
    const matches = useSelector(state => state.match.matches);
    const events = useSelector(state => state.event.events);
    const [tabItems, setTabItems] = useState([]);

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


        for (let i=0; i<matches.length; i++) {
            let matchId = matches[i].matchId;
            let status = matches[i].matchStatus;
            let type = matches[i].matchType;
            let item = {
                ...matches[i],
                id: matchId,
                team1: matches[i].team1Name,
                team2: matches[i].team2Name,
                time: matches[i].matchTime,
            };

            let statusKey = status === 0 ? 'live' : status === 1 ? 'inplay' : 'completed';
            tmpLeagues['all'][statusKey].push(item); 
            tmpLeagues[type][statusKey].push(item);
        }

        for (let i=0; i<events.length; i++) {
            let matchId = events[i].matchId;
            let status = events[i].matchStatus;
            let type = events[i].matchType;
            let item = {
                ...events[i],
                id: matchId,
                team1: events[i].team1Name,
                team2: events[i].team2Name,
                time: matches[i].matchTime,
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
    }, [matches, betStatus, events]);

    return (
        <section className="dashboard-content section1-rt">
            <div className="overlay">
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="cmn-btn reg connect-bn-rt mb-2"
                        onClick={() => history.push('/addmatch')}
                        style={{width: 'fit-content'}}
                    >
                        <i className="fas fa-plus"></i>
                        {' '} Add a new match
                    </button>
                    <button
                        type="button"
                        className="cmn-btn reg connect-bn-rt mb-2"
                        onClick={() => history.push('/addmatch2')}
                        style={{width: 'fit-content', marginLeft: '5px'}}
                    >
                        <i className="fas fa-plus"></i>
                        {' '} Add a new event
                    </button>
                    {/* <button
                        type="button"
                        className="cmn-btn reg connect-bn-rt mb-2"
                        onClick={() => SOCKET.emit('REFRESH')}
                        style={{width: 'fit-content', marginLeft: '5px'}}
                    >
                        Force Refresh
                    </button> */}
                </div>
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
                        <LeaguesTabContentAdmin
                            key={index}
                            id={ele.contentId}
                            hiddenBy={ele.tabId}
                            show={index === 0}
                            active={index === 0}
                            title={ele.contentTitle}
                            matchData={ele.matchData}
                            matchType={ele.type}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Leagues;