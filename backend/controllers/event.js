const Event = require('mongoose').model('Event');
const { getMatchId } = require('../utils/blockchain');

const addEvent = async (req, res) => {
    try {
        const matchId = await getMatchId();

        const createRes = await new Event({
            ...req.body,
            matchId: matchId - 1,
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

const getEvent = async (req, res) => {
    try {
        const findRes = await new Promise((resolve, reject) => {
            Event.aggregate([{
                $lookup: {
                    from: 'matches',
                    localField: 'parentMatch',
                    foreignField: 'matchId',
                    as: "parentMatch",
                }
            }]).exec((err, events) => {
                if (err) reject(err);
                else resolve(events);
            });
        });

        let sendRes = [];
        if (findRes) {
            for (let i=0; i<findRes.length; i++) {
                sendRes.push({
                    _id: findRes[i]._id,
                    matchId: findRes[i].matchId,
                    betContent: findRes[i].betContent,
                    matchStatus: findRes[i].matchStatus,
                    totalBet: findRes[i].totalBet,
                    totalBetWci: findRes[i].totalBetWci,
                    team1Name: findRes[i].parentMatch[0].team1Name,
                    team1Score: findRes[i].parentMatch[0].team1Score,
                    team1Logo: findRes[i].parentMatch[0].team1Logo,
                    team2Name: findRes[i].parentMatch[0].team2Name,
                    team2Score: findRes[i].parentMatch[0].team2Score,
                    team2Logo: findRes[i].parentMatch[0].team2Logo,
                    matchType: findRes[i].parentMatch[0].matchType,
                    matchTime: findRes[i].parentMatch[0].matchTime,
                })
            }
            res.status(200).json(sendRes);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        console.log('error in get event: ', err);
        res.status(500).json('Internal server error.');
    }
}

const updateEvent = async (req, res) => {
    try {
        const { matchId } = req.params;

        if (req.body.totalBet) {
            const findRes = await Event.findOne({ matchId });
            if (!findRes) {
                res.status(200).json('No data');
                return;
            }

            if (parseFloat(findRes.totalBet) >= parseFloat(req.body.totalBet)) {
                res.status(200).json('No need to update');
                return;
            }
        }

        if (req.body.totalBetWci) {
            const findRes = await Event.findOne({ matchId });
            if (!findRes) {
                res.status(200).json('No data');
                return;
            }

            if (parseFloat(findRes.totalBetWci) >= parseFloat(req.body.totalBetWci)) {
                res.status(200).json('No need to update');
                return;
            }
        }

        const updateRes = await Event.findOneAndUpdate({ matchId }, req.body).catch(err => {
            return res.status(500).json('Internal server error.');
        });

        if (updateRes) {
            res.status(200).json('Success');
        } else {
            res.status(400).json('Failed');
        }
    } catch (err) {
        console.log('error in update event error: ', err);
        res.status(500).json('Internal server error');
    }
}

const updateEventById = async (matchId, updateData) => {
    try {
        await Event.findOneAndUpdate({ matchId }, updateData).catch(err => {
            console.log('error in update evebt by id in block: ', err);
        });
    } catch (err) {
        console.log('error in update event by id: ', err);
    }
}

module.exports = { addEvent, getEvent, updateEvent, updateEventById };