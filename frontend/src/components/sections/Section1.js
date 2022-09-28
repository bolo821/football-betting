import React from 'react';
import LogoImg from '../../assets/images/logo.png';
import PlayersImg from '../../assets/images/players.png';

const Section1 = () => {
    return (
        <>
            <section className="section1-rt">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <img src={LogoImg} width="100%" />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <img src={PlayersImg} width="100%" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Section1;