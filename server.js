const express = require("express");
const loginroute = require("./routes/login.js");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello jaaa");
});

app.use("/login", loginroute);

app.listen(3001, () => {
  console.log("Start server at port 3001.");
});
