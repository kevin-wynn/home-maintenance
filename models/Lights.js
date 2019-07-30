const mongoose = require("mongoose");

const LightSchema = new mongoose.Schema({
  room: String,
  type: String,
  temp: String,
  description: String,
  last_replaced: Date,
  brand: String,
  volt: Number,
  watt: Number
});

module.exports = mongoose.model("Lights", LightSchema);
