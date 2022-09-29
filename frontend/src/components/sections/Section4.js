import React from "react";

const Section4 = () => {
    return (
        <section className="how-it-works banner-section section4-rt">
            <div className="container">
                <div className="main-content">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-5">
                            <h4 className="mb-4">Steps</h4>
                            <ul className="nav" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <h5 className="nav-link active" id="sport-tab" data-bs-toggle="tab"
                                        data-bs-target="#sport" role="tab" aria-controls="sport" aria-selected="true">
                                        <span className="image-area">
                                            <img src="assets/images/icon/how-works-icon-1.png" alt="icon" />
                                        </span>
                                        Follow us on twitter
                                    </h5>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h5 className="nav-link" id="match-tab" data-bs-toggle="tab" data-bs-target="#match"
                                        role="tab" aria-controls="match" aria-selected="false">
                                        <span className="image-area">
                                            <img src="assets/images/icon/how-works-icon-2.png" alt="icon" />
                                        </span>
                                        Tweet about WCI
                                    </h5>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h5 className="nav-link" id="team-tab" data-bs-toggle="tab" data-bs-target="#team"
                                        role="tab" aria-controls="team" aria-selected="false">
                                        <span className="image-area">
                                            <img src="assets/images/icon/how-works-icon-3.png" alt="icon" />
                                        </span>
                                        Hold WCI in wallet
                                    </h5>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h5 className="nav-link" id="odds-tab" data-bs-toggle="tab" data-bs-target="#odds"
                                        role="tab" aria-controls="odds" aria-selected="false">
                                        <span className="image-area">
                                            <img src="assets/images/icon/how-works-icon-4.png" alt="icon" />
                                        </span>
                                        Choose winning team
                                    </h5>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h5 className="nav-link" id="amount-tab" data-bs-toggle="tab" data-bs-target="#amount"
                                        role="tab" aria-controls="amount" aria-selected="false">
                                        <span className="image-area">
                                            <img src="assets/images/icon/how-works-icon-5.png" alt="icon" />
                                        </span>
                                        Win and share prize money
                                    </h5>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="sport" role="tabpanel"
                                    aria-labelledby="sport-tab">
                                    <h4>Follow us on twitter</h4>
                                    <div className="img-area">
                                        <img src="assets/images/process-img-1.png" alt="image" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="match" role="tabpanel" aria-labelledby="match-tab">
                                    <h4>Tweet about WCI</h4>
                                    <div className="img-area">
                                        <img src="assets/images/process-img-2.png" alt="image" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="team" role="tabpanel" aria-labelledby="team-tab">
                                    <h4>Hold WCI in wallet</h4>
                                    <div className="img-area">
                                        <img src="assets/images/process-img-3.png" alt="image" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="odds" role="tabpanel" aria-labelledby="odds-tab">
                                    <h4>Choose winning team</h4>
                                    <div className="img-area">
                                        <img src="assets/images/process-img-4.png" alt="image" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="amount" role="tabpanel" aria-labelledby="amount-tab">
                                    <h4>Win and share prize money </h4>
                                    <div className="img-area">
                                        <img src="assets/images/process-img-5.png" alt="image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="counter-section">
                <div className="container">
                    <div className="row cus-mar">
                        <div className="col-xl-4 col-md-6">
                            <div className="single-area d-flex align-items-center">
                                <div className="img-area">
                                    <img src="assets/images/icon/counter-icon-1.png" alt="image" />
                                </div>
                                <div className="text-area">
                                    <h3 className="m-none"><span>€</span><span>1304,941</span></h3>
                                    <p>Paid Out Prize in Total</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="single-area d-flex align-items-center">
                                <div className="img-area">
                                    <img src="assets/images/icon/counter-icon-2.png" alt="image" />
                                </div>
                                <div className="text-area">
                                    <h3 className="m-none"><span>76,752</span></h3>
                                    <p>Winners</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="single-area d-flex align-items-center">
                                <div className="img-area">
                                    <img src="assets/images/icon/counter-icon-3.png" alt="image" />
                                </div>
                                <div className="text-area">
                                    <h3 className="m-none"><span>4,392</span></h3>
                                    <p>Players online</p>
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