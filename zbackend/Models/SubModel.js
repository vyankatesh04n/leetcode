const mongoose = require("mongoose");
const UserSub = require("./UserSubModel");

const subsSchema = new mongoose.Schema({
    email: String,
    ques: [UserSub.schema]
})

module.exports = mongoose.model("Sub", subsSchema);