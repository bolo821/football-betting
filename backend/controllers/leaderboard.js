const Leaderboard = require('mongoose').model('Leaderboard');

const getLeaderboard = async () => {
    try {
        const findRes = await Leaderboard.find({});
        return findRes;
    } catch (err) {
        return [];
    }
}

const updateLeaderboard = async (account, updateData) => {
    try {
        await Leaderboard.findOneAndUpdate({ account }, updateData);
        return true;
    } catch (err) {
        console.log('error in updating referral: ', err);
        return false;
    }
}

module.exports = { getLeaderboard, updateLeaderboard };