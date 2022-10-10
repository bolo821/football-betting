import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LeaguesTabContent from '../home/LeaguesTabContent';
import TabItem from '../TabItem';
import { worldcupMatchData, uefaMatchData } from './matchData';
import { getEarnings, getMultipliers, getBetResult, getBetStatus, getBetAmount, getTotalBet } from '../../actions';
import { getTimeDifference } from '../../utils/helper';

var timer = null;

const Leagues = () => {
    const dispatch = useDispatch();
    const betStatus = useSelector(state => state.transaction.betStatus);

    const { account } = useWeb3React();

    const [wMatchData, setWMatchData] = useState(worldcupMatchData);
    const [eMatchData, setEMatchData] = useState(uefaMatchData);
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
    }, [dispatch]);
    
    useEffect(() => {
        if (account) {
            dispatch(getBetAmount(account));
            dispatch(getEarnings(account));
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
        setWLive(wMatchData.filter(ele => {
            if (betStatus[ele.id] === 0 || betStatus[ele.id] === 1) return true;
            return false;
        }));
        setWCompleted(wMatchData.filter(ele => {
            if (betStatus[ele.id] === 2) return true;
            return false;
        }));
    }, [wMatchData, betStatus]);

    useEffect(() => {
        setELive(eMatchData.filter(ele => {
            if (betStatus[ele.id] === 0 || betStatus[ele.id] === 1) return true;
            return false;
        }));
        setECompleted(eMatchData.filter(ele => {
            if (betStatus[ele.id] === 2) return true;
            return false;
        }));
    }, [eMatchData, betStatus]);

    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">
                <div className="dashboard-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12">
                                <ul className="nav league-nav-rt" role="tablist">
                                    <TabItem className="nav-link active" id="id-uefa-bets-nav-ietm" dataTarget="id-uefa-bets">
                                        EPL BETS
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
                        title="EPL BETS"
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