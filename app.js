const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const history = require("connect-history-api-fallback");

mongoose.connect("mongodb://localhost/home-maintenance", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const lightsRouter = require("./routes/lights");

const app = express();

app.use(history());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/lights", lightsRouter);

app.use(express.static(path.join(__dirname, "dist")));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Home Maintenance running on port " + listener.address().port);
});
