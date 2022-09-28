import React from 'react';
import CounterElement from '../CounterElement';

const matchData = [
    { country1: 'Qatar', country2: 'Ecuador', days: '54', hours: '20', mins: '30', secs: '40' },
    { country1: 'Qatar', country2: 'Ecuador', days: '54', hours: '20', mins: '30', secs: '40' },
    { country1: 'Qatar', country2: 'Ecuador', days: '54', hours: '20', mins: '30', secs: '40' },
    { country1: 'Qatar', country2: 'Ecuador', days: '54', hours: '20', mins: '30', secs: '40' },
    { country1: 'Qatar', country2: 'Ecuador', days: '54', hours: '20', mins: '30', secs: '40' },
    { country1: 'Qatar', country2: 'Ecuador', days: '54', hours: '20', mins: '30', secs: '40' },
]

const Section2 = () => {
    return (
        <>
            <section className="bet-this-game all-soccer-bets bets-2 section2-rt">
                <div className="toolbar-rt">
                    <div className="container">
                        <div className="filter-section">
                            <div className="section-text text-center">
                                <h3>FIFA WorldCup 2022 Bets</h3>
                            </div>
                            <form action="#">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="input-area">
                                            <img src="assets/images/icon/search-icon.png" alt="icon" />
                                            <input type="text" placeholder="Search by Team" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="single-input">
                                            <select>
                                                <option>Search by Player</option>
                                                <option value="2">Team 1</option>
                                                <option value="3">Team 2</option>
                                                <option value="4">Team 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="single-input">
                                            <select>
                                                <option>Search by Games</option>
                                                <option value="1">League 1</option>
                                                <option value="2">League 2</option>
                                                <option value="3">League 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="input-area">
                                            <img src="assets/images/icon/date-icon.png" alt="icon" />
                                            <input type="text" id="dateSelect" placeholder="Select Date" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pb-120 bet-part-rt">
                    <div className="container">
                        <div className="row cus-mar">
                            { matchData.map((ele, index) => (
                                <div className="col-lg-6" key={index}>
                                    <div className="single-area">
                                        <div className="head-area d-flex align-items-center">
                                            <span className="mdr cmn-btn">Pick Winner</span>
                                            <p>Nov 20 2022, 13:00 AM</p>
                                        </div>
                                        <div className="main-content row">
                                            <div className="team-single col-lg-3 col-md-12">
                                                <h4>{ele.country1}</h4>
                                                <div className="img-area">
                                                    <img src="assets/images/team-logo-1.png" alt="image" />
                                                </div>
                                            </div>
                                            <div className="mid-area text-center col-lg-6 col-md-12">
                                                <div className="countdown d-flex align-items-center justify-content-around">
                                                    <CounterElement count={ele.days} unit="days" />
                                                    <CounterElement count={ele.hours} unit="hrs" />
                                                    <CounterElement count={ele.mins} unit="mins" />
                                                    <CounterElement count={ele.secs} unit="secs" />
                                                </div>
                                            </div>
                                            <div className="team-single col-lg-3 col-md-12">
                                                <h4 className="d-flex justify-content-end h4-rt">{ele.country2}</h4>
                                                <div className="img-area">
                                                    <img src="assets/images/team-logo-2.png" alt="image" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bottom-item">
                                            <button type="button" className="cmn-btn firstTeam" data-bs-toggle="modal"
                                                data-bs-target="#betpop-up">{ele.country1} will win</button>
                                            <button type="button" className="cmn-btn draw" data-bs-toggle="modal"
                                                data-bs-target="#betpop-up">Draw</button>
                                            <button type="button" className="cmn-btn lastTeam" data-bs-toggle="modal"
                                                data-bs-target="#betpop-up">{ele.country2} will win</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-center">
                                <div className="bottom-area mt-60">
                                    <span className="btn-border">
                                        <a href="soccer-bets-2.html" className="cmn-btn">Browse More</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Section2;