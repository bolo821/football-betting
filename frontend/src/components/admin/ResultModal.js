import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ResultModal = ({ isOpen, setIsOpen, setMatchResult, team1, team2, team1Score, setTeam1Score, team2Score, setTeam2Score }) => {
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
                <select ref={selectRef} onChange={handleSelect} className="mb-3">
                    <option value="0">{`${team1} won`}</option>
                    <option value="1">Drew</option>
                    <option value="2">{`${team2} won`}</option>
                </select>
                <div className="input-single w-100 mb-3">
                    <label>{team1} Score</label>
                    <div className="input-area">
                        <input type="text" name="team1Score" placeholder="team1 score" value={team1Score} onChange={e => setTeam1Score(e.target.value)} />
                    </div>
                </div>
                <div className="input-single w-100 mb-3">
                    <label>{team2} Score</label>
                    <div className="input-area">
                        <input type="text" name="team2Score" placeholder="team2 score" value={team2Score} onChange={e => setTeam2Score(e.target.value)} />
                    </div>
                </div>
                <div className="bottom-item">
                    <button className="cmn-btn lastTeam" onClick={() => setMatchResult(result)}>Set Result</button>
                </div>
            </div>
        </Modal>
    );
}

export default ResultModal;