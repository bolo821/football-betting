import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.png';
import PlayersImg from '../../assets/images/players.png';

const Section1 = () => {
    const history = useHistory();

    return (
        <>
            <section className="section1-rt">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 logo-rt d-flex">
                            <img src={LogoImg} width="100%" onClick={() => history.push('/')} />
                        </div>
                        <div className="col-md-6 d-flex players-img-rt">
                            <img src={PlayersImg} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Section1;