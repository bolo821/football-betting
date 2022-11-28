const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

const EventSchema = new mongoose.Schema({
  matchId: {
    type: Number,
    required: true,
    unique: true,
  },
  parentMatch: {
    type: Number,
    required: true,
    ref: 'Match',
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
  }
});

autoIncrement.initialize(mongoose.connection);
EventSchema.plugin(autoIncrement.plugin, 'Event');
module.exports = mongoose.model("Event", EventSchema);