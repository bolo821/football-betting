const Match = require('mongoose').model('Match');
const { getMatchId } = require('../utils/blockchain');

var matchId = 0;

const addMatch = async (req, res) => {
    try {
        const { team1Logo, team2Logo } = req.files;
        // const matchId = await getMatchId();

        const createRes = await new Match({
            ...req.body,
            matchId: matchId++,
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

module.exports = { addMatch, getMatch, updateMatch };