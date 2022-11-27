import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LeaguesTabContentAdmin from '../admin/LeaguesTabContentAdmin';
import TabItem from '../TabItem';
import { SOCKET } from '../../config/apis';

const Leagues = () => {
    const history = useHistory();
    const betStatus = useSelector(state => state.transaction.betStatus);
    const matches = useSelector(state => state.match.matches);
    const [tabItems, setTabItems] = useState([]);

    useEffect(() => {
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


        for (let i=0; i<matches.length; i++) {
            let matchId = matches[i].matchId;
            let status = betStatus[matchId];
            let type = matches[i].matchType;
            let item = {
                ...matches[i],
                id: matchId,
                team1: matches[i].team1Name,
                team2: matches[i].team2Name,
                time: matches[i].matchTime,
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
            } else if (type === "laliga") {
                if (status === 2) {
                    tmpLaCompleted.push(item);
                } else if (status === 1) {
                    tmpLaUpcoming.push(item);
                } else {
                    tmpLaLive.push(item);
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

        let tmpTabItems = [
            {
                tabId: "id-uefa-champion-bets-nav-item-admin",
                contentId: "id-uefa-champion-bets-admin",
                tabContent: "UEFA",
                contentTitle: "UEFA Champion League",
                matchData: [tmpELive, tmpEUpcoming, tmpECompleted]
            },
            {
                tabId: "id-uefa-bets-nav-item-admin",
                contentId: "id-uefa-bets-admin",
                tabContent: "Europa",
                contentTitle: "UEFA Europa League",
                matchData: [tmpEELive, tmpEEUpcoming, tmpEECompleted]
            },
            {
                tabId: "id-english-bets-nav-item-admin",
                contentId: "id-english-bets-admin",
                tabContent: "EPL",
                contentTitle: "English Premier League",
                matchData: [tmpEnLive, tmpEnUpcoming, tmpEnCompleted]
            },
            {
                tabId: "id-laliga-nav-item-admin",
                contentId: "id-laliga-admin",
                tabContent: "LaLiga",
                contentTitle: "La Liga Matches",
                matchData: [tmpLaLive, tmpLaUpcoming, tmpLaCompleted]
            },
            {
                tabId: "id-worldcup-bets-nav-item-admin",
                contentId: "id-worldcup-bets-admin",
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
    }, [matches, betStatus]);

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
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Leagues;