import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../layouts/Header';
import { AddMatchCard } from '../components/addmatch/form';
import { getDateString, getTimeString } from '../utils/helper';
import { addMatch } from '../actions';
import { toast } from 'react-toastify';

const AddMatch = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        team1Name: '',
        team1Abbr: '',
        team1Logo: null,
        team2Name: '',
        team2Abbr: '',
        team2Logo: null,
        matchDate: getDateString(new Date()),
        matchTime: getTimeString(new Date()),
        matchType: 'worldcup',
    });
    const [team1Logo, setTeam1Logo] = useState(null);
    const [team2Logo, setTeam2Logo] = useState(null);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleAdd = e => {
        e.preventDefault();
        if (!validate()) toast.error('Please fill all required fields.');

        let sendData = new FormData();
        sendData.append('team1Name', formData.team1Name);
        sendData.append('team1Abbr', formData.team1Abbr),
        sendData.append('team1Logo', team1Logo);
        sendData.append('team2Name', formData.team2Name);
        sendData.append('team2Abbr', formData.team2Abbr);
        sendData.append('team2Logo', team2Logo);
        sendData.append('matchTime', new Date(`${formData.matchDate} ${formData.matchTime}`).toISOString());
        sendData.append('matchType', formData.matchType);

        dispatch(addMatch(sendData));
    }

    const validate = () => {
        if (formData.team1Name === '' || formData.team2Name === '' || !team1Logo || !team2Logo || formData.matchTime === '') return false;
        return true;
    }

    return (
        <>
            <Header />
            <div className="container pt-120">
                <AddMatchCard>
                    <h4 className="mb-4">Add a new match</h4>
                    <form>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>* Team1 Name</label>
                                    <div className="input-area">
                                        <input type="text" name="team1Name" placeholder="team1 name" value={formData.team1Name} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>Team1 Abbreviation</label>
                                    <div className="input-area">
                                        <input type="text" name="team1Abbr" placeholder="team1 abbreviation" value={formData.team1Abbr} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>* Team1 Logo</label>
                                    <div className="input-area">
                                        <input type="file" onChange={e => setTeam1Logo(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>* Team2 Name</label>
                                    <div className="input-area">
                                        <input type="text" name="team2Name" placeholder="team2 name" value={formData.team2Name} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>Team2 Abbreviation</label>
                                    <div className="input-area">
                                        <input type="text" name="team2Abbr" placeholder="team2 abbreviation" value={formData.team2Abbr} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>* Team2 Logo</label>
                                    <div className="input-area">
                                        <input type="file" onChange={e => setTeam2Logo(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>* Start Time</label>
                                    <div className="input-area">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <input type="date" name="matchDate" value={formData.matchDate} onChange={handleChange} />
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="time" name="matchTime" value={formData.matchTime} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-single">
                                    <label>* Match Type</label>
                                    <div className="input-area">
                                        <select name="matchType" value={formData.matchType} onChange={handleChange}>
                                            <option value="uefa">UEFA Champion</option>
                                            <option value="uefa_e">UEFA Europa</option>
                                            <option value="english_p">English Premier</option>
                                            <option value="laliga">La Liga</option>
                                            <option value="worldcup">WorldCup</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <span className="btn-border">
                                <button type="submit" onClick={handleAdd} className="cmn-btn">Add</button>
                            </span>
                        </div>
                    </form>
                </AddMatchCard>
            </div>
        </>
    );
}

export default AddMatch;