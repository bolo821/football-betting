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
                                    <TabItem className="nav-link active" id="id-uefa-bets-nav-item-admin" dataTarget="id-uefa-bets-admin">
                                        EPL BETS
                                    </TabItem>
                                    <TabItem className="nav-link" id="id-worldcup-bets-nav-item-admin" dataTarget="id-worldcup-bets-admin">
                                        Worldcup Bets
                                    </TabItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <LeaguesTabContentAdmin
                        id="id-uefa-bets-admin"
                        hiddenBy="id-uefa-bets-nav-item-admin"
                        show={true}
                        active={true}
                        title="EPL BETS"
                        matchData={[eLive, eUpcoming, eCompleted]}
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