import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ConnectWalletModal from './ConnectWalletModal';
import { getReducedAddressString } from "../utils/helper";

const Header = () => {
    const wallet = useSelector(state => state.user.wallet);
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
                        {wallet === '' ? 'CONNECT' : getReducedAddressString(wallet)}
                    </button>
                </div>
            </div>
            <ConnectWalletModal isOpen={openModal} setIsOpen={setOpenModal} />
        </header>
    )
}

export default Header;