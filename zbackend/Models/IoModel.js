const mongoose = require('mongoose');

const iosSchema = new mongoose.Schema({
    input: [Number],
    output: Number
});
  
module.exports = mongoose.model("IO", iosSchema);   