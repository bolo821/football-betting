import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ConnectWalletModal from './ConnectWalletModal';
import { getReducedAddressString } from "../utils/helper";
import { useWeb3React } from '@web3-react/core';
import config from '../config';
import MobileMenu from './MobileMenu';

const NavbarItems = styled('ul')({
    display: 'flex',
    marginRight: '20px',
    '& li': {
        padding: '0 10px',
        '& a': {
            color: 'white',
            padding: 0,
            fontWeight: '700',
        },
        '& a:focus': {
            color: 'white',
        },
        '& a:hover': {
            color: 'var(--head-color)',
        },
        '& a.active': {
            color: 'var(--head-color)',
        }
    },
    '@media screen and (max-width: 992px)': {
        display: 'none'
    }
});

const Hamburger = styled('button')({
    border: 'none',
    background: 'transparent',
    color: 'white',
    display: 'none',
    marginLeft: '10px',
    '@media screen and (max-width: 992px)': {
        display: 'block'
    }
});

const Header = () => {
    const { pathname } = useLocation();
    const { account } = useWeb3React();
    const [openModal, setOpenModal] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    useEffect(() => {
        var fixed_top = window.$(".header-section");
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
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="d-flex w-100 justify-content-end align-items-center">
                        <NavbarItems>
                            <li className="nav-item">
                                <Link className={`nav-link${pathname === '/' ? ' active' : ''}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link${pathname === '/trade' ? ' active' : ''}`} to="/trade">Trade</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://wcibets.com" target="_blank" rel="noreferrer noopener">
                                    PvP
                                </a>
                            </li>
                            { account ?
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link${pathname === '/dashboard' ? ' active' : ''}`} to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link${pathname === '/collaterals' ? ' active' : ''}`} to="/collaterals">Collaterals</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link${pathname === '/history' ? ' active' : ''}`} to="/history">History</Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className={`nav-link${pathname === '/leaderboard' ? ' active' : ''}`} to="/leaderboard">Leaderboard</Link>
                                    </li> */}
                                </> :
                                <></>
                            }
                            { account === config.adminWalletAddress &&
                                <li className="nav-item">
                                    <Link className={`nav-link${pathname === '/admin' ? ' active' : ''}`} to="/admin">Admin</Link>
                                </li>
                            }
                        </NavbarItems>
                        <div className="d-flex align-items-center">
                            <button
                                type="button"
                                className="cmn-btn reg connect-bn-rt"
                                onClick={() => setOpenModal(true)}
                            >
                                {!account ? 'CONNECT' : getReducedAddressString(account)}
                            </button>
                        </div>
                        <Hamburger onClick={() => setOpenMobileMenu(true)}>
                            <i className="fas fa-bars"></i>
                        </Hamburger>
                    </div>
                </nav>
            </div>
            <ConnectWalletModal isOpen={openModal} setIsOpen={setOpenModal} />
            <MobileMenu isOpen={openMobileMenu} setIsOpen={setOpenMobileMenu} path={pathname} />
        </header>
    )
}

export default Header;