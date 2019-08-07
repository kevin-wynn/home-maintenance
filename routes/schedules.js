const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedules");
const moment = require("moment");

router.get("/getAllEvents", (req, res) => {
  Schedule.find({}, (err, events) => {
    if (err) res.send(err);
    res.send(events);
  });
});

router.delete("/deleteEvent", (req, res) => {
  Schedule.findByIdAndDelete(req.body.id, err => {
    if (err) console.log(err);
    res.sendStatus(200);
  });
});

router.post("/saveEvent", (req, res) => {
  req.body.start = moment(req.body.start)
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  req.body.end = moment(req.body.end)
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const event = new Schedule(req.body);
  event.save((err, resp) => {
    if (err) res.send(err);
    res.send(resp);
  });
});

module.exports = router;
