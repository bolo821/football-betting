const matchRoutes = require('./routes/matchRoutes');
const referralRoutes = require('./routes/referralRoutes');

module.exports = app => {
    app.use('/api/match', matchRoutes);
    app.use('/api/referral', referralRoutes);
}