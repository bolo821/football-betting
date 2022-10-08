import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ConnectWalletModal from './ConnectWalletModal';
import { getReducedAddressString } from "../utils/helper";
import { useWeb3React } from '@web3-react/core';
import config from '../config';

const Header = () => {
    const history = useHistory();
    const wallet = useSelector(state => state.user.wallet);
    const { account } = useWeb3React();
    const [openModal, setOpenModal] = useState(false);

    return (
        <header className="header-section">
            <div className='container'>
                <div className="d-flex justify-content-end py-3">
                    <button
                        type="button"
                        className="cmn-btn reg connect-bn-rt"
                        onClick={() => setOpenModal(true)}
                    >
                        {!wallet ? 'CONNECT' : getReducedAddressString(wallet)}
                    </button>
                    { account === config.adminWalletAddress &&
                        <button
                            type="button"
                            className="cmn-btn reg connect-bn-rt"
                            onClick={() => history.push('/admin')}
                        >
                            Admin Page
                        </button>
                    }
                </div>
            </div>
            <ConnectWalletModal isOpen={openModal} setIsOpen={setOpenModal} />
        </header>
    )
}

export default Header;