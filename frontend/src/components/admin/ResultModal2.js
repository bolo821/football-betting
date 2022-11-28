import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ResultModal2 = ({ isOpen, setIsOpen, setMatchResult, betContent }) => {
    const selectRef = useRef(null);
    const [result, setResult] = useState('0');

    useEffect(() => {
        if (!isOpen) {
            setResult('0');
        }
    }, [isOpen]);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const handleSelect = e => {
        setResult(e.target.value);
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
                    Please select the bet result.
                </h5>
                <p style={{color: '#41cd7d', fontSize: '20px'}}>
                    {betContent}
                </p>
                <select ref={selectRef} onChange={handleSelect} className="mb-3">
                    <option value="0">YES</option>
                    <option value="2">NO</option>
                </select>
                <div className="bottom-item">
                    <button className="cmn-btn lastTeam" onClick={() => setMatchResult(result)}>Set Result</button>
                </div>
            </div>
        </Modal>
    );
}

export default ResultModal2;