const matchRoutes = require('./routes/matchRoutes');
const referralRoutes = require('./routes/referralRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const eventRoutes = require('./routes/eventRoutes');

module.exports = app => {
    app.use('/api/match', matchRoutes);
    app.use('/api/referral', referralRoutes);
    app.use('/api/leaderboard', leaderboardRoutes);
    app.use('/api/event', eventRoutes);
}