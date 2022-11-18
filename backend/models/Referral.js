const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

const ReferralSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
  },
  referrer: {
    type: String,
  },
  referrerEarned: {
    type: Number,
    default: 0.0,
  },
  profitClaimed: {
    type: Boolean,
    default: false,
  }
});

autoIncrement.initialize(mongoose.connection);
ReferralSchema.plugin(autoIncrement.plugin, 'Referral');
module.exports = mongoose.model("Referral", ReferralSchema);
