import React, { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const BetModal = ({ betAmount, setBetAmount, isOpen, setIsOpen, doBet, token }) => {
    useEffect(() => {
        if (!isOpen) {
            setBetAmount('');
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
                    { token === 'ETH' ?
                        "(You need to bet at least 0.01 ETH.)" :
                        "(You need to bet at least 1000 WCI.)"
                    }
                    
                </p>
                <div className="input-area">
                    <input
                        placeholder="Input your bet amount"
                        type="number"
                        value={betAmount}
                        onChange={e => {setBetAmount(e.target.value)}}
                        onKeyDown={e => {setBetAmount(e.target.value)}}
                    />
                </div>
                <div className="bottom-item">
                    <button className="cmn-btn lastTeam" onClick={doBet} >Bet</button>
                </div>
            </div>
        </Modal>
    );
}

export default BetModal;