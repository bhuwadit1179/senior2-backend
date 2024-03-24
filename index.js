const express = require("express");
const route = require("./routes/route.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", route);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("test deployment");
});

module.exports = app;
