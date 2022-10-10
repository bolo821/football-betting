import React, { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const BetModal = ({ betAmount, setBetAmount, isOpen, setIsOpen, doBet }) => {
    useEffect(() => {
        if (!isOpen) {
            setBetAmount(0);
        }
    }, [isOpen]);

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
                    Please input your bet amount.
                </h5>
                <p>
                    (You need to bet at least 0.011ETH.)
                </p>
                <div className="input-area">
                    <input type="number" placeholder="Input your bet amount" value={betAmount} onChange={e => setBetAmount(e.target.value)} />
                </div>
                <div className="bottom-item">
                    <button className="cmn-btn lastTeam" onClick={doBet} >Bet</button>
                </div>
            </div>
        </Modal>
    );
}

export default BetModal;