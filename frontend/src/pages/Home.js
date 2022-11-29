import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import Section3 from '../components/home/Section3';
import Section4 from '../components/home/Section4';
import Leagues from '../components/home/Leagues';

import { addReferrer } from '../actions';

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { account } = useWeb3React();
    
    useEffect(() => {
        if (account) {
            let query = location.search;
            if (query === '') {
                dispatch(addReferrer({
                    account,
                    referrer: '',
                }));
                return;
            }
    
            const arr = query.split('=');
            if (arr.length !== 2) return;
    
            const referrer = arr[1];

            dispatch(addReferrer({
                account,
                referrer,
            }));
        }
    }, [location.search, account]);
    
    return (
        <>
            <Header />
            <Section1 />
            {/* <Leagues /> */}
            <section className="dashboard-content pt-2">
                <div className="overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="dashboard-heading-rt dashboard-heading p-5 w-100 mb-5">
                                    <h3 style={{color: 'white', textAlign: 'center', marginBottom: '10px'}}>
                                        The website is in maintenance mode. 
                                        <br />
                                        We are updating the bet smart contract to reduce the tax fee and update the functionalities.
                                    </h3>
                                    <p style={{color: 'white', textAlign: 'center'}}>
                                        (Your earnings and bet histories will be stored safely. Thanks for your patience.)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            <Section4 />
        </>
    )
}

export default Home;