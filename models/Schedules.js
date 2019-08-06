const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  repeat: String,
  name: String,
  start: Date,
  end: Date,
  description: String,
  color: String
});

module.exports = mongoose.model("Schedules", ScheduleSchema);
