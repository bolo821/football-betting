import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layouts/Header';
import { AddMatchCard } from '../components/addmatch/form';
import { addEvent } from '../actions';
import { toast } from 'react-toastify';

const AddMatch2 = () => {
    const dispatch = useDispatch();
    const matches = useSelector(state => state.match.matches);
    const [selectData, setSelectData] = useState(matches);

    const [formData, setFormData] = useState({
        parentMatch: -1,
        betContent: '',
    });

    useEffect(() => {
        setSelectData(matches.filter(ele => ele.matchStatus === 0).sort((a, b) => {
            return a.matchId - b.matchId;
        }));
    }, [matches]);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleAdd = e => {
        e.preventDefault();
        if (!validate()) return toast.error('Please fill all required fields.');

        dispatch(addEvent(formData));
    }

    const validate = () => {
        if (parseInt(formData.parentMatch) < 0 || formData.betContent === '') return false;
        return true;
    }

    return (
        <>
            <Header />
            <div className="container pt-120">
                <AddMatchCard>
                    <h4 className="mb-4">Add a new event to a match</h4>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-single">
                                    <label>Choose Match</label>
                                    <div className="input-area">
                                        <select name="parentMatch" value={formData.matchType} onChange={handleChange}>
                                            <option value={-1} disabled>Choose a match which will include this event</option>
                                            { selectData.map(match => (
                                                <option value={match.matchId} key={match.matchId}>{match.team1Name} / {match.team2Name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="input-single">
                                    <label>Bet Content</label>
                                    <div className="input-area">
                                        <textarea name="betContent" placeholder="Please input the bet content." value={formData.betContent} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <span className="btn-border">
                                <button type="submit" onClick={handleAdd} className="cmn-btn">Add Event</button>
                            </span>
                        </div>
                    </form>
                </AddMatchCard>
            </div>
        </>
    );
}

export default AddMatch2;