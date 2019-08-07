const express = require("express");
const router = express.Router();
const Netgear = require("netgear");
const netgearRouter = new Netgear();

router.get("/getDevices", (req, res) => {
  netgearRouter.login({ password: process.env.NETGEAR_PASSWORD }).then(resp => {
    if (resp) {
      netgearRouter.getAttachedDevices().then(devices => {
        res.send(devices);
      });
    }
  });
});

router.get("/getRouterInformation", (req, res) => {
  netgearRouter.login({ password: process.env.NETGEAR_PASSWORD }).then(() => {
    netgearRouter.getInfo().then(data => res.send(data));
  });
});

module.exports = router;
