const axios = require('axios');
const { getInPlayMatches } = require('../controllers/match');
const { updateMatchById } = require('../controllers/match');

const getInplayGames = async (leagueId) => {
    try {
        const res = await axios.get(`https://api.b365api.com/v3/events/inplay?sport_id=1&token=${process.env.BETSAPI_KEY}&league_id=${leagueId}`);
        if (res && res.data) {
            return res.data.results;
        } else {
            return null;
        }
    } catch (err) {
        console.log('error in get inplay games: ', err);
        return null;
    }
}

const watchInPlayGames = (io) => {
    setInterval(async () => {
        let matches = await getInPlayMatches();
        let leagueIds = [];
        for (let i=0; i<matches.length; i++) {
            for (let j=0; j<leagueIds.length; j++) {
                if (matches[i].leagueId === leagueIds[j]) continue;
            }
            leagueIds.push(matches[i].leagueId);
        }

        let bUpdatd = false;
        for (let i=0; i<leagueIds.length; i++) {
            const inPlayMatch = await getInplayGames(leagueIds[i]);
            if (inPlayMatch) {
                for (let j=0; j<inPlayMatch.length; j++) {
                    let homeTeam = inPlayMatch[j].home.name;
                    let awayTeam = inPlayMatch[j].away.name;
                    let scores = inPlayMatch[j].ss.split('-');

                    for (let k=0; k<matches.length; k++) {
                        if (matches[k].leagueId !== leagueIds[i]) continue;
                        let team1 = matches[k].team1Name;
                        let team2 = matches[k].team2Name;

                        if (homeTeam.includes(team1) && awayTeam.includes(team2)) {
                            if (parseInt(matches[k].team1Score) !== parseInt(scores[0]) || parseInt(matches[k].team2Score) !== parseInt(scores[1])) {
                                await updateMatchById(matches[k].matchId, { team1Score: scores[0], team2Score: scores[1] });
                                bUpdatd = true;
                            }
                        } else if (homeTeam.includes(team2) && awayTeam.includes(team1)) {
                            if (parseInt(matches[k].team1Score) !== parseInt(scores[1]) || parseInt(matches[k].team2Score !== parseInt(scores[0]))) {
                                await updateMatchById(matches[k].matchId, { team1Score: scores[1], team2Score: scores[0] });
                                bUpdatd = true;
                            }
                        }
                    }
                }
            }
        }

        if (bUpdatd) io.emit('UPDATE_SCORE');
    }, 10000);
}

module.exports = { getInplayGames, watchInPlayGames };