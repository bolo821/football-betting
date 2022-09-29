import React, { useState, useEffect, useCallback } from 'react';
import CounterElement from '../CounterElement';

import { getTimeDifference } from '../../utils/helper';

import ArgentinaImg from '../../assets/images/teams/Argentina.png';
import AustraliaImg from '../../assets/images/teams/Australia.png';
import BelgiumImg from '../../assets/images/teams/Belgium.png';
import Brazilimg from '../../assets/images/teams/Brazil.png';
import CameroonImg from '../../assets/images/teams/Cameroon.png';
import CanadaImg from '../../assets/images/teams/Canada.png';
import Costa_RicaImg from '../../assets/images/teams/Costa_Rica.png';
import CroatiaImg from '../../assets/images/teams/Croatia.png';
import DenmarkImg from '../../assets/images/teams/Denmark.png';
import EnglandImg from '../../assets/images/teams/England.png';
import EcuadorImg from '../../assets/images/teams/Ecuador.png';
import FranceImg from '../../assets/images/teams/France.png';
import GermanyImg from '../../assets/images/teams/Germany.png';
import GhanaImg from '../../assets/images/teams/Ghana.png';
import IranImg from '../../assets/images/teams/Iran.png';
import JapanImg from '../../assets/images/teams/Japan.png';
import MexicoImg from '../../assets/images/teams/Mexico.png';
import MoroccoImg from '../../assets/images/teams/Morocco.png';
import NetherlandsImg from '../../assets/images/teams/Netherlands.png';
import PolandImg from '../../assets/images/teams/Poland.png';
import PortugalImg from '../../assets/images/teams/Portugal.png';
import QatarImg from '../../assets/images/teams/Qatar.png';
import Saudi_ArabiaImg from '../../assets/images/teams/Saudi_Arabia.png';
import SenegalImg from '../../assets/images/teams/Senegal.png';
import SerbiaImg from '../../assets/images/teams/Serbia.png';
import SpainImg from '../../assets/images/teams/Spain.png';
import SwitzerlandImg from '../../assets/images/teams/Switzerland.png';
import TunisiaImg from '../../assets/images/teams/Tunisia.png';
import UruguayImg from '../../assets/images/teams/Uruguay.png';
import USAImg from '../../assets/images/teams/USA.png';
import WalesImg from '../../assets/images/teams/Wales.png';

const matchData = [
    { team1: 'Qatar', team1Logo: QatarImg, team2: 'Ecuador', team2Logo: EcuadorImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 20 2022, 16:00' },
    { team1: 'Senegal', team1Logo: SenegalImg, team2: 'Netherlands', team2Logo: NetherlandsImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 20 2022, 16:00' },
    { team1: 'England', team1Logo: EnglandImg, team2: 'Iran', team2Logo: IranImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 21 2022, 13:00' },
    { team1: 'USA', team1Logo: USAImg, team2: 'Wales', team2Logo: WalesImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 21 2022, 19:00' },
    { team1: 'Argentina', team1Logo: ArgentinaImg, team2: 'Saudi Arabia', team2Logo: Saudi_ArabiaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 22 2022, 10:00' },
    { team1: 'Mexico', team1Logo: MexicoImg, team2: 'Poland', team2Logo: PolandImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 22 2022, 16:00' },
    { team1: 'Denmark', team1Logo: DenmarkImg, team2: 'Tunisia', team2Logo: TunisiaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 22 2022, 13:00' },
    { team1: 'France', team1Logo: FranceImg, team2: 'Australia', team2Logo: AustraliaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 22 2022, 19:00' },
    { team1: 'Germany', team1Logo: GermanyImg, team2: 'Japan', team2Logo: JapanImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 23 2022, 13:00' },
    { team1: 'Spain', team1Logo: SpainImg, team2: 'Costa Rica', team2Logo: Costa_RicaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 23 2022, 16:00' },
    { team1: 'Morocco', team1Logo: MoroccoImg, team2: 'Croatia', team2Logo: CroatiaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 23 2022, 10:00' },
    { team1: 'Belgium', team1Logo: BelgiumImg, team2: 'Canada', team2Logo: CanadaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 23 2022, 19:00' },
    { team1: 'Switzerland', team1Logo: SwitzerlandImg, team2: 'Cameroon', team2Logo: CameroonImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 24 2022, 10:00' },
    { team1: 'Brazil', team1Logo: Brazilimg, team2: 'Serbia', team2Logo: SerbiaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 24 2022, 19:00' },
    // { team1: 'Uruguay', team1Logo: UruguayImg, team2: 'China', team2Logo: SerbiaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 24 2022, 13:00' },
    { team1: 'Portugal', team1Logo: PortugalImg, team2: 'Ghana', team2Logo: GhanaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 24 2022, 16:00' },
    
    { team1: 'Qatar', team1Logo: QatarImg, team2: 'Senegal', team2Logo: SenegalImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 25 2022, 13:00' },
    { team1: 'Netherlands', team1Logo: NetherlandsImg, team2: 'Ecuador', team2Logo: EcuadorImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 25 2022, 16:00' },
    { team1: 'Wales', team1Logo: WalesImg, team2: 'Iran', team2Logo: IranImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 25 2022, 10:00' },
    { team1: 'England', team1Logo: EnglandImg, team2: 'USA', team2Logo: USAImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 25 2022, 19:00' },
    { team1: 'Poland', team1Logo: PolandImg, team2: 'Saudi Arabia', team2Logo: Saudi_ArabiaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 26 2022, 13:00' },
    { team1: 'Argentina', team1Logo: ArgentinaImg, team2: 'Mexico', team2Logo: MexicoImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 26 2022, 19:00' },
    { team1: 'Tunisia', team1Logo: TunisiaImg, team2: 'Australia', team2Logo: AustraliaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 26 2022, 10:00' },
    { team1: 'France', team1Logo: FranceImg, team2: 'Denmark', team2Logo: DenmarkImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 26 2022, 16:00' },
    { team1: 'Japan', team1Logo: JapanImg, team2: 'Costa Rica', team2Logo: Costa_RicaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 27 2022, 10:00' },
    { team1: 'Spain', team1Logo: SpainImg, team2: 'Germany', team2Logo: GermanyImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 27 2022, 19:00' },
    { team1: 'Croatia', team1Logo: CroatiaImg, team2: 'Canada', team2Logo: CanadaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 27 2022, 16:00' },
    { team1: 'Belgium', team1Logo: BelgiumImg, team2: 'Morocco', team2Logo: MoroccoImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 27 2022, 13:00' },
    { team1: 'Cameroon', team1Logo: CameroonImg, team2: 'Serbia', team2Logo: SerbiaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 28 2022, 10:00' },
    { team1: 'Brazil', team1Logo: Brazilimg, team2: 'Switzerland', team2Logo: SwitzerlandImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 28 2022, 16:00' },
    // { team1: 'China', team1Logo: SerbiaImg, team2: 'Ghana', team2Logo: GhanaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 28 2022, 13:00' },
    { team1: 'Portugal', team1Logo: PortugalImg, team2: 'Uruguay', team2Logo: UruguayImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 28 2022, 19:00' },

    { team1: 'Ecuador', team1Logo: EcuadorImg, team2: 'Senegal', team2Logo: SenegalImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 29 2022, 15:00' },
    { team1: 'Netherlands', team1Logo: NetherlandsImg, team2: 'Qatar', team2Logo: QatarImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 29 2022, 15:00' },
    { team1: 'Iran', team1Logo: IranImg, team2: 'USA', team2Logo: USAImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 29 2022, 19:00' },
    { team1: 'Wales', team1Logo: WalesImg, team2: 'England', team2Logo: EnglandImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 29 2022, 19:00' },
    { team1: 'Poland', team1Logo: PolandImg, team2: 'Argentina', team2Logo: ArgentinaImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 30 2022, 19:00' },
    { team1: 'Saudi Arabia', team1Logo: Saudi_ArabiaImg, team2: 'Mexico', team2Logo: MexicoImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 30 2022, 19:00' },
    { team1: 'Tunisia', team1Logo: TunisiaImg, team2: 'France', team2Logo: FranceImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 30 2022, 15:00' },
    { team1: 'Australia', team1Logo: AustraliaImg, team2: 'Denmark', team2Logo: DenmarkImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Nov 30 2022, 15:00' },
    { team1: 'Japan', team1Logo: JapanImg, team2: 'Spain', team2Logo: SpainImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 1 2022, 19:00' },
    { team1: 'Costa Rica', team1Logo: Costa_RicaImg, team2: 'Germany', team2Logo: GermanyImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 1 2022, 19:00' },
    { team1: 'Croatia', team1Logo: CroatiaImg, team2: 'Belgium', team2Logo: BelgiumImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 1 2022, 15:00' },
    { team1: 'Canada', team1Logo: CanadaImg, team2: 'Morocco', team2Logo: MoroccoImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 1 2022, 15:00' },
    { team1: 'Serbia', team1Logo: SerbiaImg, team2: 'Switzerland', team2Logo: SwitzerlandImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 2 2022, 22:00' },
    { team1: 'Cameroon', team1Logo: CameroonImg, team2: 'Brazil', team2Logo: Brazilimg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 2 2022, 19:00' },
    // { team1: 'China', team1Logo: SerbiaImg, team2: 'Portugal', team2Logo: PortugalImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 2 2022, 15:00' },
    { team1: 'Ghana', team1Logo: GhanaImg, team2: 'Uruguay', team2Logo: UruguayImg, days: '54', hours: '20', mins: '30', secs: '40', time: 'Dec 2 2022, 15:00' },
]

const Section2 = () => {
    const [matches, setMatches] = useState(matchData);
    const [timer, setTimer] = useState(null);
    const [displayCount, setDisplayCount] = useState(6);
    const [displayMatches, setDisplayMatches] = useState([]);

    useEffect(() => {
        let timerId = setInterval(() => {
            let newMatches = matches.map(ele => {
                let diff = getTimeDifference(new Date(), ele.time);
                return {
                    ...ele,
                    days: diff.day,
                    hours: diff.hour,
                    mins: diff.minute,
                    secs: diff.second,
                }
            });

            setMatches(newMatches);
        });
        setTimer(timerId);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, []);

    const handleBrowseMore = useCallback(() => {
        if (displayCount > matches.length) return;
        setDisplayCount(displayCount + 6);
    }, [matches, displayCount]);

    useEffect(() => {
        setDisplayMatches(matches.slice(0, displayCount));
    }, [matches]);

    return (
        <>
            <section className="bet-this-game all-soccer-bets bets-2 section2-rt">
                <div className="toolbar-rt">
                    <div className="container">
                        <div className="filter-section">
                            <div className="section-text text-center">
                                <h3>FIFA WorldCup 2022 Bets</h3>
                            </div>
                            <form action="#">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="input-area">
                                            <img src="assets/images/icon/search-icon.png" alt="icon" />
                                            <input type="text" placeholder="Search by Team" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="single-input">
                                            <select>
                                                <option>Search by Player</option>
                                                <option value="2">Team 1</option>
                                                <option value="3">Team 2</option>
                                                <option value="4">Team 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="single-input">
                                            <select>
                                                <option>Search by Games</option>
                                                <option value="1">League 1</option>
                                                <option value="2">League 2</option>
                                                <option value="3">League 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6">
                                        <div className="input-area">
                                            <img src="assets/images/icon/date-icon.png" alt="icon" />
                                            <input type="text" id="dateSelect" placeholder="Select Date" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pb-120 bet-part-rt">
                    <div className="container">
                        <div className="row cus-mar">
                            { displayMatches.map((ele, index) => (
                                <div className="col-lg-6" key={index}>
                                    <div className="single-area betting-card-rt">
                                        <div className="head-area d-flex align-items-center">
                                            <span className="mdr cmn-btn">Pick Winner</span>
                                            <p>{ele.time}</p>
                                        </div>
                                        <div className="main-content row">
                                            <div className="team-single col-lg-3 col-md-12">
                                                <h4 className='d-flex justify-content-start'>{ele.team1}</h4>
                                                <div className="img-area">
                                                    <img src={ele.team1Logo} width="100%" alt="image" />
                                                </div>
                                            </div>
                                            <div className="mid-area text-center col-lg-6 col-md-12">
                                                <div className="countdown d-flex align-items-center justify-content-around">
                                                    <CounterElement count={ele.days} unit="days" />
                                                    <CounterElement count={ele.hours} unit="hrs" />
                                                    <CounterElement count={ele.mins} unit="mins" />
                                                    <CounterElement count={ele.secs} unit="secs" />
                                                </div>
                                            </div>
                                            <div className="team-single col-lg-3 col-md-12">
                                                <h4 className="d-flex justify-content-end h4-rt">{ele.team2}</h4>
                                                <div className="img-area">
                                                    <img src={ele.team2Logo} width="100%" alt="image" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bottom-item">
                                            <button type="button" className="cmn-btn firstTeam" data-bs-toggle="modal"
                                                data-bs-target="#betpop-up">{ele.team1} will win</button>
                                            <button type="button" className="cmn-btn draw" data-bs-toggle="modal"
                                                data-bs-target="#betpop-up">Draw</button>
                                            <button type="button" className="cmn-btn lastTeam" data-bs-toggle="modal"
                                                data-bs-target="#betpop-up">{ele.team2} will win</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        { displayCount < matches.length &&
                            <div className="row">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="bottom-area mt-60">
                                        <span className="btn-border">
                                            <button onClick={handleBrowseMore} className="cmn-btn">Browse More</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Section2;