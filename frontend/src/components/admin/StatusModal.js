import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

var timer = null;

const StatusModal = ({ isOpen, setIsOpen, setMatchStatus, setMatchStatus2, matchType }) => {
    const selectRef = useRef(null);
    const [status, setStatus] = useState('0');

    useEffect(() => {
        timer = setInterval(() => {
            if (selectRef.current) {
                // window.$("select").niceSelect();
                clearInterval(timer);
                timer = null;
            }
        }, 100);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setStatus('0');
        }
    }, [isOpen]);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const handleSelect = e => {
        setStatus(e.target.value);
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
                <h5 className="mb-3">
                    Please select the bet status.
                </h5>
                <select ref={selectRef} onChange={handleSelect}>
                    <option value="0">Betting</option>
                    <option value="1">In Play</option>
                    <option value="2">Claiming</option>
                </select>
                <div className="bottom-item mt-5">
                    { matchType === 'match' ?
                        <button className="cmn-btn lastTeam" onClick={() => setMatchStatus(status)}>Set Status</button> :
                        <button className="cmn-btn lastTeam" onClick={() => setMatchStatus2(status)}>Set Status</button>
                    }
                    
                </div>
            </div>
        </Modal>
    );
}

export default StatusModal;