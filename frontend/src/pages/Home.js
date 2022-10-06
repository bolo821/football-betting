import React from 'react';

import Header from '../layouts/Header';
import Section1 from '../components/sections/Section1';
import Section3 from '../components/sections/Section3';
import Section4 from '../components/sections/Section4';
import Leagues from '../components/sections/Leagues';

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