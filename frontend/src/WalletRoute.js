import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

const WalletRoute = (props) => {
    const { account } = useWeb3React();

    if (account) {
        return <Route {...props} />
    } else {
        return <Redirect to="/" />
    }
}

export default WalletRoute;