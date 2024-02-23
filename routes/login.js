const express = require("express");
const router = express.Router();
const { firebaseAuth } = require("../firebase/config");
const auth = require("firebase/auth");

router.get("/", (req, res) => {
  res.send("This is login path");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  // Client not send username and password
  if (!username || !password) {
    res.status(400).json({
      status_code: 400,
      message: "Please input username and password",
    });
  }

  try {
    const response = await auth.signInWithEmailAndPassword(
      firebaseAuth,
      username,
      password
    );
    console.log("login success");

    // Success
    res.status(200).json({
      user_id: response.user.uid,
      accessToken: response.user.accessToken,
    });
  } catch (e) {
    // Client login with wrong username or password
    res.status(401).json({
      status_code: 401,
      message: "Not authorized",
    });
  }
});

module.exports = router;
