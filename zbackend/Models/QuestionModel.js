const mongoose = require("mongoose");
const IO = require("./IoModel");

let questionsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    difficulty: String,
    acceptance: String,
    io: [IO.schema]
})

module.exports = mongoose.model("Question", questionsSchema);