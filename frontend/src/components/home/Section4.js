import React from "react";
import { useSelector } from "react-redux";
import { getRoundedNumber1 } from "../../utils/helper";

const Section4 = () => {
    const { totalPrize, winnerCount, totalPrizeWci, winnerCountWci } = useSelector(state => state.transaction);

    return (
        <section className="how-it-works banner-section section4-rt">
            <div className="counter-section">
                <div className="container">
                    <div className="row cus-mar">
                        <div className="col-md-6 pl-sm-5">
                            <div className="single-area d-flex align-items-center w-100 bet-stat-info-rt">
                                <div className="img-area">
                                    <img src="assets/images/icon/counter-icon-1.png" alt="image" />
                                </div>
                                <div className="text-area">
                                    <h3 className="m-none"><span>{getRoundedNumber1(totalPrize)} ETH</span></h3>
                                    <p>Total ETH Prize</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="single-area d-flex align-items-center w-100 bet-stat-info-rt">
                                <div className="img-area">
                                    <img src="assets/images/icon/counter-icon-2.png" alt="image" />
                                </div>
                                <div className="text-area">
                                    <h3 className="m-none"><span>{winnerCount}</span></h3>
                                    <p>ETH Winner Count</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="single-area d-flex align-items-center w-100 bet-stat-info-rt">
                                <div className="img-area">
                                    <img src="assets/images/icon/counter-icon-1.png" alt="image" />
                                </div>
                                <div className="text-area">
                                    <h3 className="m-none"><span style={{lineHeight: '1.2'}}>{parseInt(totalPrizeWci)} WCI</span></h3>
                                    <p>Total WCI Prize</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="single-area d-flex align-items-center w-100 bet-stat-info-rt">
                                <div className="img-area">
                                    <img src="assets/images/icon/counter-icon-2.png" alt="image" />
                                </div>
                                <div className="text-area">
                                    <h3 className="m-none"><span>{winnerCountWci}</span></h3>
                                    <p>WCI Winner Count</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section4;