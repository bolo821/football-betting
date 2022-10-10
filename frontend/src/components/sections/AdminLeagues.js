import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LeaguesTabContentAdmin from '../admin/LeaguesTabContentAdmin';
import TabItem from '../TabItem';
import { worldcupMatchData, uefaMatchData } from './matchData';
import { getEarnings, getMultipliers, getBetResult, getBetStatus, getBetAmount, getTotalBet } from '../../actions';

const Leagues = () => {
    const dispatch = useDispatch();
    const betStatus = useSelector(state => state.transaction.betStatus);

    const { account } = useWeb3React();

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
        setWLive(worldcupMatchData.filter(ele => {
            if (betStatus[ele.id] === 0 || betStatus[ele.id] === 1) return true;
            return false;
        }));
        setWCompleted(worldcupMatchData.filter(ele => {
            if (betStatus[ele.id] === 2) return true;
            return false;
        }));
    }, [betStatus]);

    useEffect(() => {
        setELive(uefaMatchData.filter(ele => {
            if (betStatus[ele.id] === 0 || betStatus[ele.id] === 1) return true;
            return false;
        }));
        setECompleted(uefaMatchData.filter(ele => {
            if (betStatus[ele.id] === 2) return true;
            return false;
        }));
    }, [betStatus]);

    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">
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