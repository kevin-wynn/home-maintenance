const express = require("express");
const router = express.Router();
const Light = require("../models/Lights");

router.get("/getAllLights", (req, res) => {
  Light.find({}, (err, lights) => {
    if (err) res.send(err);
    res.send(lights);
  });
});

router.post("/saveLight", (req, res) => {
  const light = new Light(req.body);
  light.save((err, resp) => {
    if (err) res.send(err);
    res.send(resp);
  });
});

module.exports = router;
