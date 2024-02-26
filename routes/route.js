const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");
const { firestore } = require("../firebase/config");
const { getProfileController } = require("../controllers/profile");
const { getRegisterContoller } = require("../controllers/register");
const { getPositionController } = require("../controllers/position");

router.get("/profile", verifyToken, getProfileController);
router.post("/register", verifyToken, getRegisterContoller);
router.get("/position", verifyToken, getPositionController);
module.exports = router;
