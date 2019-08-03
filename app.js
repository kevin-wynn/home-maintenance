const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/home-maintenance", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const lightsRouter = require("./routes/lights");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/lights", lightsRouter);

app.get("/", function(req, res) {
  console.log(
    "im here at the root and im gonna server up:",
    path.join(__dirname + "build/index.html")
  );

  res.sendFile(path.join(__dirname + "build/index.html"));
});

module.exports = app;
