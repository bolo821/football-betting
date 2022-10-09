import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LeaguesTabContentAdmin from '../admin/LeaguesTabContentAdmin';
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
        dispatch(getBetStatus());
        dispatch(getMultipliers());
        dispatch(getBetResult());
    }, [dispatch]);
    
    useEffect(() => {
        if (account) {
            dispatch(getEarnings(account));
        }
    }, [account]);

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