const mongoose = require("mongoose");
const db_string = process.env.MONGO_URL;

require('./models/Match');
require("./models/Token");

mongoose.connect(db_string, { user: process.env.MONGO_USERNAME, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => {
  	console.log("MongoDB connected...");
}).catch(err => console.log(err));