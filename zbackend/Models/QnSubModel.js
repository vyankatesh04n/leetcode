const mongoose = require('mongoose');

const qnSubsSchema = new mongoose.Schema({
    sid: Number,
    lang: String,
    code: String,
    isAccepted: Boolean
});
  
module.exports = mongoose.model("QnSub", qnSubsSchema);   