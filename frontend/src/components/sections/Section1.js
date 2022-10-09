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
                        <div className="col-lg-6 col-md-12">
                            <img className="logo-rt" src={LogoImg} width="100%" onClick={() => history.push('/')} />
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