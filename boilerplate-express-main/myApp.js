let express = require("express");
let app = express();

// serve static assets
let path = __dirname + "/public";
app.use("/public", express.static(path));

// send index.html on root request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});

module.exports = app;
