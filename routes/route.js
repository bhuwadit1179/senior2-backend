const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const verifyToken = require("../middlewares/verifytoken");
const { getProfileController } = require("../controllers/profile");
const { getRegisterContoller } = require("../controllers/register");
const {
  getUsersController,
  getUsersByIdController,
} = require("../controllers/user");
const { getCheckInController } = require("../controllers/checkin");
const { uploadImage } = require("../controllers/image");
const { editEmployeeController } = require("../controllers/edit");
const { createSettingController } = require("../controllers/setting");
const { searchEmployeeData } = require("../controllers/search");
const { updateConfigController } = require("../controllers/updateconfig");

//User Features
router.get("/profile", verifyToken, getProfileController);
router.post("/register", verifyToken, getRegisterContoller);

//Admin Features
router.post("/admin/user/:id", verifyToken, editEmployeeController);
router.get("/admin/user", verifyToken, getUsersController);
router.get("/admin/user/:id", verifyToken, getUsersByIdController);
router.get("/admin/checkin", verifyToken, getCheckInController);
router.post("/upload", verifyToken, upload.single("file"), uploadImage);
router.post("/setting", verifyToken, createSettingController);
router.get("/search", verifyToken, searchEmployeeData);
router.put("/updateconfig", verifyToken, updateConfigController);
module.exports = router;
