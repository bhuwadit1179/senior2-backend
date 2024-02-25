const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");
const { firestore } = require("../firebase/config");
const { getProfileController } = require("../controllers/profile");
const { getRegisterContoller } = require("../controllers/register");

router.get("/profile", verifyToken, getProfileController);
router.post("/register", verifyToken, getRegisterContoller);
module.exports = router;
