const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

const GeneralSchema = new mongoose.Schema({
  matchId: {
    type: Number,
    required: true,
    unique: true,
  },
  betContent: {
    type: String,
    required: true,
  },
  matchStatus: {
    type: Number,
    default: 0,
  },
  totalBet: {
    type: String,
    default: '0',
  },
  totalBetWci: {
    type: String,
    default: '0',
  },
  team1Name: {
    type: String,
    required: true,
  },
  team1Logo: {
    type: String,
    default: '',
  },
  team2Name: {
    type: String,
    required: true,
  },
  team2Logo: {
    type: String,
    default: '',
  },
  drawName: {
    type: String,
    default: '',
  }
});

autoIncrement.initialize(mongoose.connection);
GeneralSchema.plugin(autoIncrement.plugin, 'General');
module.exports = mongoose.model("General", GeneralSchema);