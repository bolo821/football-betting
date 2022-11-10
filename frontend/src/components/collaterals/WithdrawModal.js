import React, { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const WithdrawModal = ({ amount, setAmount, isOpen, setIsOpen, withdraw }) => {

    useEffect(() => {
        if (!isOpen) {
            setAmount(0);
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
                <h5 className="mb-4">
                    Please input withdraw amount
                </h5>
                <div className="input-area">
                    <input type="number" placeholder="Input your bet amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="bottom-item">
                    <button className="cmn-btn lastTeam" onClick={withdraw} >Withdraw</button>
                </div>
            </div>
        </Modal>
    );
}

export default WithdrawModal;