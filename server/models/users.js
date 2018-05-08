const mongoose  = require("mongoose");

let usersSchema = new mongoose.Schema({
	firstName: String,
	secondName: String,
	text: String,
	value: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Users2", usersSchema);