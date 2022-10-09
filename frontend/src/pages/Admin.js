import React from 'react';

import Header from '../layouts/Header';
import Section1 from '../components/sections/Section1';
import Section3 from '../components/sections/Section3';
import Section4 from '../components/sections/Section4';
import AdminLeagues from '../components/sections/AdminLeagues';

const Admin = () => {
    return (
        <>
            <Header />
            <Section1 />
            <AdminLeagues />
            <Section3 />
            <Section4 />
        </>
    )
}

export default Admin;