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
    unique: true,
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
  team1ScoreOvertime: {
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
  team2ScoreOvertime: {
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
  },
  matchStatus: {
    type: Number,
    default: 0,
  },
  matchStatusOvertime: {
    type: Number,
    default: 0,
  },
  totalBet: {
    type: String,
    default: 0,
  },
  totalBetOvertime: {
    type: String,
    default: 0,
  },
  totalBetWci: {
    type: String,
    default: '0',
  },
  totalBetWciOvertime: {
    type: String,
    default: '0',
  },
});

autoIncrement.initialize(mongoose.connection);
MatchSchema.plugin(autoIncrement.plugin, 'Match');
module.exports = mongoose.model("Match", MatchSchema);
