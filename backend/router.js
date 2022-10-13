const matchRoutes = require('./routes/matchRoutes');

module.exports = app => {
    app.use('/api/match', matchRoutes);
}