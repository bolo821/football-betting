import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

var timer = null;

const ResultModal = ({ isOpen, setIsOpen, setMatchResult, team1, team2 }) => {
    const selectRef = useRef(null);
    const [result, setResult] = useState('0');

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
                <select ref={selectRef} onChange={handleSelect}>
                    <option value="0">{`${team1} won`}</option>
                    <option value="1">Drew</option>
                    <option value="2">{`${team2} won`}</option>
                </select>
                <div className="bottom-item mt-5">
                    <button className="cmn-btn lastTeam" onClick={() => setMatchResult(result)}>Set Result</button>
                </div>
            </div>
        </Modal>
    );
}

export default ResultModal;