import React from 'react';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import Section3 from '../components/home/Section3';
import Section4 from '../components/home/Section4';
import Leagues from '../components/home/Leagues';

const Home = () => {
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