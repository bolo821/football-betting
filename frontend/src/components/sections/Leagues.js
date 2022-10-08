import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LeaguesTabContent from '../home/LeaguesTabContent';
import TabItem from '../TabItem';
import { worldcupMatchData, uefaMatchData } from './matchData';
import { getEarnings, getMultipliers, getBetResult, getBetStatus } from '../../actions';
import { useRouterContract } from '../../hooks/useContract';
import { getTimeDifference } from '../../utils/helper';

var timer = null;

const Leagues = () => {
    const dispatch = useDispatch();
    const betStatus = useSelector(state => state.transaction.betStatus);

    const { account } = useWeb3React();
    const routerContract = useRouterContract();

    const [wMatchData, setWMatchData] = useState(worldcupMatchData);
    const [eMatchData, setEMatchData] = useState(uefaMatchData);
    const [wLive, setWLive] = useState([]);
    const [wUpcoming, setWUpcoming] = useState([]);
    const [wCompleted, setWCompleted] = useState([]);
    const [eLive, setELive] = useState([]);
    const [eUpcoming, setEUpcoming] = useState([]);
    const [eCompleted, setECompleted] = useState([]);

    useEffect(() => {
        dispatch(getBetStatus(routerContract));
        dispatch(getMultipliers(routerContract));
        dispatch(getBetResult(routerContract));
    }, [dispatch]);
    
    useEffect(() => {
        if (account) {
            dispatch(getEarnings(routerContract, account));
            // routerContract.methods.setBetResult(54, 2).send({ from: account });
            // routerContract.methods.setBetStatus(55, 2).send({ from: account });
            // routerContract.methods.createMany(4).send({ from: account });
            // routerContract.methods.getMatchId().call().then(res => {
            //     console.log('result: ', res);
            // });
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
    }, [wMatchData]);

    useEffect(() => {
        setELive(eMatchData.filter(ele => {
            if (betStatus[ele.id] === 0 || betStatus[ele.id] === 1) return true;
            return false;
        }));
        setECompleted(eMatchData.filter(ele => {
            if (betStatus[ele.id] === 2) return true;
            return false;
        }));
    }, [eMatchData]);

    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">
                <div className="dashboard-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12">
                                <ul className="nav league-nav-rt" role="tablist">
                                    <TabItem className="nav-link active" id="id-uefa-bets-nav-ietm" dataTarget="id-uefa-bets">
                                        UEFA Bets
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
                        title="UEFA Bets"
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