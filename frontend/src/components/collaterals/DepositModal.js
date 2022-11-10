import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DepositModal = ({ amount, setAmount, isOpen, setIsOpen, deposit, token }) => {
    const [warning, setWarning] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setAmount(0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (token === 0) setWarning('Minimum deposit amount is 0.01 ETH.');
        else if (token === 1) setWarning('Minimum deposit amount is 20 USDT.');
        else if (token === 2) setWarning('Minimum deposit amount is 20 USDC.');
        else if (token === 3) setWarning('Minimum deposit amount is 2,000,000 SHIB.');
        else if (token === 4) setWarning('Minimum deposit amount is 200 DOGE.');
    }, [token]);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
        >
            <div className="bet-modal-content-rt">
                <h5>
                    Please input deposit amount
                </h5>
                <p>
                    {warning}
                </p>
                <div className="input-area">
                    <input type="number" placeholder="Input your bet amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="bottom-item">
                    <button className="cmn-btn lastTeam" onClick={deposit} >Deposit</button>
                </div>
            </div>
        </Modal>
    );
}

export default DepositModal;