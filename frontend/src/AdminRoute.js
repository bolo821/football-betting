import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import config from './config';

const AdminRoute = (props) => {
    const { account } = useWeb3React();

    if (account === config.adminWalletAddress || account === config.oldAdminWalletAddress) {
        return <Route {...props} />
    } else {
        return <Redirect to="/" />
    }
}

export default AdminRoute;