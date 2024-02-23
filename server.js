const express = require("express");
const loginroute = require("./routes/login.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello jaaa");
});

app.use("/login", loginroute);

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
