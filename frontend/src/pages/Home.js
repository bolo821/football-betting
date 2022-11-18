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
            if (query === '') return;
    
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
            <Leagues />
            <Section3 />
            <Section4 />
        </>
    )
}

export default Home;