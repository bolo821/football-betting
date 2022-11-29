const General = require('mongoose').model('General');
const { getMatchId } = require('../utils/blockchain');

const addGeneral = async (req, res) => {
    try {
        const matchId = await getMatchId();

        const createRes = await new General({
            ...req.body,
            matchId: matchId - 1,
        }).save();

        res.status(200).json(createRes);        
    } catch (err) {
        console.log('error in add a general: ', err);
        res.status(500).json("Internal server error.");
    }
}

const getGeneral = async (req, res) => {
    try {
        const findRes = await General.find({});

        if (findRes) {
            res.status(200).json(findRes);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        console.log('error in get general data: ', err);
        res.status(500).json('Internal server error.');
    }
}

const updateGeneral = async (req, res) => {
    try {
        const { matchId } = req.params;

        if (req.body.totalBet) {
            const findRes = await General.findOne({ matchId });
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
            const findRes = await General.findOne({ matchId });
            if (!findRes) {
                res.status(200).json('No data');
                return;
            }

            if (parseFloat(findRes.totalBetWci) >= parseFloat(req.body.totalBetWci)) {
                res.status(200).json('No need to update');
                return;
            }
        }

        const updateRes = await General.findOneAndUpdate({ matchId }, req.body).catch(err => {
            return res.status(500).json('Internal server error.');
        });

        if (updateRes) {
            res.status(200).json('Success');
        } else {
            res.status(400).json('Failed');
        }
    } catch (err) {
        console.log('error in update general error: ', err);
        res.status(500).json('Internal server error');
    }
}

const updateGeneralById = async (matchId, updateData) => {
    try {
        await General.findOneAndUpdate({ matchId }, updateData).catch(err => {
            console.log('error in update general by id in block: ', err);
        });
    } catch (err) {
        console.log('error in update general by id: ', err);
    }
}

module.exports = { addGeneral, getGeneral, updateGeneral, updateGeneralById };