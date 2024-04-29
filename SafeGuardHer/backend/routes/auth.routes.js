const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const multer = require("multer");

// Multer configuration for handling image uploads
const upload = multer({ dest: "upload/" });

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOTP);
router.post("/check-onboarded", authController.checkOnboarded);
router.post("/create-password", authController.createPassword);
router.post("/complete-profile", authController.completeProfile);
router.get("/all/:userId", authController.getAllUsers);

module.exports = router;
