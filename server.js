const express = require("express");
const route = require("./routes/route.js");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/", route);

app.listen(3001, () => {
  console.log("Start server at port 3001.");
});
