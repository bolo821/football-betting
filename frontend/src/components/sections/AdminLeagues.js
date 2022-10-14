import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LeaguesTabContentAdmin from '../admin/LeaguesTabContentAdmin';
import TabItem from '../TabItem';

const Leagues = () => {
    const history = useHistory();
    const betStatus = useSelector(state => state.transaction.betStatus);
    const matches = useSelector(state => state.match.matches);

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
    }, [matches, betStatus]);

    return (
        <section className="dashboard-content pt-120">
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
                </div>
                <div className="dashboard-heading">
                    <div className="container">
                        
                        <div className="row">
                            <div className="col-xl-9 col-lg-12">
                                <ul className="nav league-nav-rt" role="tablist">
                                    <TabItem className="nav-link active" id="id-uefa-champion-bets-nav-item-admin" dataTarget="id-uefa-champion-bets-admin">
                                        UEFA Champion
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-uefa-bets-nav-item-admin" dataTarget="id-uefa-bets-admin">
                                        UEFA Europa
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-english-bets-nav-item-admin" dataTarget="id-english-bets-admin">
                                        English Premier League
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-worldcup-bets-nav-item-admin" dataTarget="id-worldcup-bets-admin">
                                        Worldcup
                                    </TabItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <LeaguesTabContentAdmin
                        id="id-uefa-champion-bets-admin"
                        hiddenBy="id-uefa-champion-bets-nav-item-admin"
                        show={true}
                        active={true}
                        title="UEFA Champion League"
                        matchData={[eLive, eUpcoming, eCompleted]}
                    />
                    <LeaguesTabContentAdmin
                        id="id-uefa-bets-admin"
                        hiddenBy="id-uefa-bets-nav-item-admin"
                        show={false}
                        active={false}
                        title="UEFA Europa League"
                        matchData={[eeLive, eeUpcoming, eeCompleted]}
                    />
                    <LeaguesTabContentAdmin
                        id="id-english-bets-admin"
                        hiddenBy="id-english-bets-nav-item-admin"
                        show={false}
                        active={false}
                        title="English Premier League"
                        matchData={[enLive, enUpcoming, enCompleted]}
                    />
                    <LeaguesTabContentAdmin
                        id="id-worldcup-bets-admin"
                        hiddenBy="id-worldcup-bets-nav-item-admin"
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