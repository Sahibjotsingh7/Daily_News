const express = require("express");
const { signup, login, forgotPassword, verifyOTP, resetPassword } = require("../Controllers/user");
const { validateUser, validateResetPassword } = require("../Middlewares/userVallidation");

const router = express.Router();

router.post("/signup", validateUser, signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", validateResetPassword, resetPassword);

module.exports = router;
