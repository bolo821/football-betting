const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

const MatchSchema = new mongoose.Schema({
  matchId: {
    type: Number,
    required: true,
  },
  team1Name: {
    type: String,
    required: true,
  },
  team1Abbr: {
    type: String,
    default: 'T1',
  },
  team1Logo: {
    type: String,
    default: '',
  },
  team1Score: {
    type: Number,
    default: 0,
  },
  team2Name: {
    type: String,
    required: true,
  },
  team2Abbr: {
    type: String,
    defualt: 'T2',
  },
  team2Logo: {
    type: String,
    default: '',
  },
  team2Score: {
    type: Number,
    default: 0,
  },
  matchTime: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  matchType: {
    type: String,
    default: 'worldcup',
  }
});

autoIncrement.initialize(mongoose.connection);
MatchSchema.plugin(autoIncrement.plugin, 'Match');
module.exports = mongoose.model("Match", MatchSchema);
