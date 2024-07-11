const express = require("express");
const router = express.Router();
const {
  CreateUser,
  Login,
  UserData,
  ResetPassword,
  UpdatePassword,
} = require("../controller/authController");
const ApiRateLimiter = require("../middleware/attempts/apiRateLimiter");
const authmiddleware = require("../middleware/VerifyToken/authorization");
router.post("/register", CreateUser);
router.post("/login", ApiRateLimiter, Login);
router.post("/get-user-info-by-id", authmiddleware, UserData);
router.post("/requestPasswordReset", ResetPassword);
router.post("/resetPassword/:userId/:resetString", UpdatePassword);

module.exports = router;
