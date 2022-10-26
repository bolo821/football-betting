import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        var fixed_top = $(".header-section");
        window.$(window).on("scroll", function () {
        if (window.$(window).scrollTop() > 50) {
            fixed_top.addClass("animated fadeInDown header-fixed");
        }
        else {
            fixed_top.removeClass("animated fadeInDown header-fixed");
        }
        });
    }, []);

    return (
        <header className="header-section header-section-rt">
            <div className='container'>
                <div className="d-flex justify-content-end py-3">
                    <a href="https://wcibets.com" target="_blank" rel="noreferrer noopener">
                        <button
                            type="button"
                            className="cmn-btn reg connect-bn-rt mr-2"
                        >
                            PvP
                        </button>
                    </a>
                    <button
                        type="button"
                        className="cmn-btn reg connect-bn-rt"
                        onClick={() => setOpenModal(true)}
                    >
                        {!wallet ? 'CONNECT' : getReducedAddressString(wallet)}
                    </button>
                    { account ?
                        <>
                            <button
                                type="button"
                                className="cmn-btn reg connect-bn-rt"
                                onClick={() => history.push('/collaterals')}
                                style={{marginLeft: '10px'}}
                            >
                                Collaterals
                            </button>
                            <button
                                type="button"
                                className="cmn-btn reg connect-bn-rt"
                                onClick={() => history.push('/history')}
                                style={{marginLeft: '10px'}}
                            >
                                History
                            </button>
                        </> :
                        <></>
                    }
                    { account === config.adminWalletAddress &&
                        <button
                            type="button"
                            className="cmn-btn reg connect-bn-rt"
                            onClick={() => history.push('/admin')}
                            style={{marginLeft: '10px'}}
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