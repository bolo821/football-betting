const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

const LeaderboardSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
  },
  totalBet: {
    type: Number,
    default: 0.0,
  },
  totalClaim: {
    type: Number,
    default: 0.0,
  },
  totalBetWci: {
    type: Number,
    default: 0.0,
  },
  totalClaimWci: {
    type: Number,
    default: 0.0,
  }
});

autoIncrement.initialize(mongoose.connection);
LeaderboardSchema.plugin(autoIncrement.plugin, 'Leaderboard');
module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
