const Match = require('mongoose').model('Match');
const { getBetStatus, setBetStatus } = require('./blockchain');

var updatingStatus = false;

const runStatusUpdateTimer = (io) => {
    setInterval(async () => {
        try {
            if (updatingStatus) return;

            updatingStatus = true;

            const matches = await Match.find({});
            const betStatus = await getBetStatus();

            for (let i=0; i<matches.length; i++) {
                if ((new Date().getTime() - new Date(matches[i].matchTime).getTime()) > 15*60*1000 && betStatus[matches[i].matchId] === 0) {
                    await setBetStatus(matches[i].matchId, 1);
                    io.emit('UPDATE_STATUS');
                }
            }
            updatingStatus = false;
        } catch (err) {
            console.log('error in interval: ', err);
        }
    }, 1000 * 60);
}

module.exports = { runStatusUpdateTimer };