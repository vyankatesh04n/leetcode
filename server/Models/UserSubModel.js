const mongoose = require("mongoose");
const QnSub = require("./QnSubModel");

const userSubsSchema = new mongoose.Schema({
    qid: Number,
    qnSub: [QnSub.schema]
})

module.exports = mongoose.model("UserSub", userSubsSchema);

