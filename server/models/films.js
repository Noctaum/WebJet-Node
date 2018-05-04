const mongoose  = require("mongoose");

let filmsSchema = new mongoose.Schema({
    Name: String,
    year: Number,
    author: String,
    category: Number,
    text: String,
});

module.exports = mongoose.model("films", filmsSchema); 