import React from 'react';

import Header from '../layouts/Header';
import Section1 from '../components/sections/Section1';
import AdminLeagues from '../components/sections/AdminLeagues';

const Admin = () => {
    return (
        <>
            <Header />
            <Section1 />
            <AdminLeagues />
        </>
    )
}

export default Admin;