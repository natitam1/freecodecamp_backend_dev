require("dotenv").config();
let express = require("express");
let app = express();

app.use(function logger(req, res, next) {
  console.log(`${req.method} /${req.path} - ${req.ip}`);
  next();
});

// serve static assets
let path = __dirname + "/public";
app.use("/public", express.static(path));

// send index.html on root request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  process.env.MESSAGE_STYLE == "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});

module.exports = app;
