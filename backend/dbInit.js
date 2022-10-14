const mongoose = require("mongoose");
const db_string = process.env.MONGO_URL;

require('./models/Match');
require("./models/Token");

mongoose.connect(db_string, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
}).then(() => {
  	console.log("MongoDB connected...");
}).catch(err => console.log(err));