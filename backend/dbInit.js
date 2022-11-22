const mongoose = require("mongoose");
const db_string = process.env.MONGO_URL;

require('./models/Match');
require("./models/Token");
require('./models/Referral');
require('./models/Leaderboard');

mongoose.connect(db_string, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
  	console.log("MongoDB connected...");
}).catch(err => console.log(err));