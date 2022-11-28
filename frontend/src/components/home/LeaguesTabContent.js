import React, { useState, useEffect } from 'react';
import Match from './Match';
import TabItem from '../TabItem';

const LeaguesTabContent = props => {
    const { id, hiddenBy, show, active, title, matchData, type } = props;
    const [liveData, setLiveData] = useState([]);
    const [compData, setCompData] = useState([]);

    useEffect(() => {
        let tmpLive = matchData[0].sort((a, b) => {
            if (a.time < b.time) return -1;
            else return 1;
        })
        let tmpComp = matchData[2].sort((a, b) => {
            if (a.time > b.time) return -1;
            else return 1;
        });

        setLiveData(tmpLive);
        setCompData(tmpComp);
    }, [matchData]);

    return (
        <div className={`tab-pane fade${show ? ' show' : ''}${active ? ' active' : ''}`} id={id} role="tabpanel" aria-labelledby={hiddenBy}>
            <div className="bets-tab">
                <div className="bet-this-game all-soccer-bets">
                    <div className="toolbar-rt">
                        <div className="container">
                            <div className="filter-section">
                                <div className="section-text text-center">
                                    <h3>{title}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-center">
                                    <ul className="nav sub-tab-container-rt" role="tablist">
                                        <TabItem className="cmn-btn active" id={`${id}-live-tab`} dataTarget={`${id}-live-tab-content`}>
                                            Live
                                        </TabItem>
                                        <TabItem className="cmn-btn" id={`${id}-upcoming-tab`} dataTarget={`${id}-upcoming-tab-content`}>
                                            In Play
                                        </TabItem>
                                        <TabItem className="cmn-btn" id={`${id}-completed-tab`} dataTarget={`${id}-completed-tab-content`}>
                                            Completed
                                        </TabItem>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bet-this-game bet-this-game-rt">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id={`${id}-live-tab-content`} role="tabpanel" aria-labelledby={`${id}-live-tab`}>
                                <Match data={liveData} type={type} />
                            </div>
                            <div className="tab-pane fade" id={`${id}-upcoming-tab-content`} role="tabpanel" aria-labelledby={`${id}-live-tab`}>
                                <Match data={matchData[1]} type={type} />
                            </div>
                            <div className="tab-pane fade" id={`${id}-completed-tab-content`} role="tabpanel" aria-labelledby={`${id}-upcoming-tab`}>
                                <Match data={compData} type={type} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaguesTabContent;