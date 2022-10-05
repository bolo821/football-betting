const wallet = require('./routes/walletRoutes');

module.exports = app => {
    app.use('/api/wallet', wallet);
}