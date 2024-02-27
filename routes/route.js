const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");
const { firestore } = require("../firebase/config");
const { getProfileController } = require("../controllers/profile");
const { getRegisterContoller } = require("../controllers/register");
const { getPositionController } = require("../controllers/position");
const {
  getUsersController,
  getUsersByIdController,
} = require("../controllers/user");

//User Features
router.get("/profile", verifyToken, getProfileController);
router.get("/position", verifyToken, getPositionController);
router.post("/register", verifyToken, getRegisterContoller);

//Admin Features
router.get("/admin/user", verifyToken, getUsersController);
router.get("/admin/user/:id", verifyToken, getUsersByIdController);

module.exports = router;
