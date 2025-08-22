require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.use(function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}, bodyParser.urlencoded({ extended: false }));

// serve static assets
let path = __dirname + "/public";
app.use("/public", express.static(path));

// /now route with chained middleware + handler
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString(); // middleware adds current time
    next();
  },
  function (req, res) {
    res.json({ time: req.time }); // handler responds with JSON
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.post("/name", (req, res) => {
  const first = req.body.first || "";
  const last = req.body.last || "";
  res.json({ name: `${first} ${last}` });
});

// send index.html on root request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});

module.exports = app;
