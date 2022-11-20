const Match = require('mongoose').model('Match');
const { getMatchId } = require('../utils/blockchain');
const { leagues } = require('../config/leagues');

const addMatch = async (req, res) => {
    try {
        const { team1Logo, team2Logo } = req.files;
        const matchId = await getMatchId();

        const createRes = await new Match({
            ...req.body,
            matchId: matchId - 1,
            team1Logo: process.env.SERVER_URL + team1Logo[0].filename,
            team2Logo: process.env.SERVER_URL + team2Logo[0].filename,
        }).save().catch(err => {
            console.log('error in save: ', err);
            res.status(500).json('Internal server error.');
            return;
        });

        res.status(200).json(createRes);        
    } catch (err) {
        console.log('error in add match: ', err);
        res.status(500).json("Internal server error.");
    }
}
const getMatch = async (req, res) => {
    try {
        const findRes = await Match.find({}).catch(err => {
            res.status(500).json('Internal server error.');
        });

        if (findRes) {
            res.status(200).json(findRes);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        console.log('error in get match: ', err);
        res.status(500).json('Internal server error.');
    }
}
const updateMatch = async (req, res) => {
    try {
        const { matchId } = req.params;

        if (req.body.totalBet) {
            const findRes = await Match.findOne({ matchId });
            if (!findRes) {
                res.status(400).json('No data');
                return;
            }

            if (parseFloat(findRes.totalBet) <= parseFloat(req.body.totalBet)) {
                res.status(400).json('No need to update');
                return;
            }
        }

        if (req.body.totalBetWci) {
            const findRes = await Match.findOne({ matchId });
            if (!findRes) {
                res.status(400).json('No data');
                return;
            }

            if (parseFloat(findRes.totalBetWci) <= parseFloat(req.body.totalBetWci)) {
                res.status(400).json('No need to update');
                return;
            }
        }

        const updateRes = await Match.findOneAndUpdate({ matchId }, req.body).catch(err => {
            return res.status(500).json('Internal server error.');
        });

        if (updateRes) {
            res.status(200).json('Success');
        } else {
            res.status(400).json('Failed');
        }
    } catch (err) {
        console.log('error in update Match error: ', err);
        res.status(500).json('Internal server error');
    }
}
const updateMatchById = async (matchId, updateData) => {
    try {
        await Match.findOneAndUpdate({ matchId }, updateData).catch(err => {
            console.log('error in update match by id in block: ', err);
        });
    } catch (err) {
        console.log('error in update match by id: ', err);
    }
}
const getInPlayMatches = async () => {
    try {
        let currentTime = new Date().getTime();
        const matches = await Match.find();
        let result = [];

        for (let i=0; i<matches.length; i++) {
            let matchTime = new Date(matches[i].matchTime).getTime();
            if (currentTime >= matchTime && currentTime <= matchTime + 150*60*1000) {
                result.push({ ...matches[i]._doc, leagueId: leagues[matches[i].matchType]});
            }
        }

        return result;
    } catch (err) {
        console.log('error while getting in play matches.');
        return [];
    }
}

module.exports = { addMatch, getMatch, updateMatch, updateMatchById, getInPlayMatches };