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
const AuthMiddleware = require("../middleware/VerifyToken/authorization");
router.post("/register", CreateUser);
router.post("/login", ApiRateLimiter, Login);
router.post("/get-user-info-by-id", AuthMiddleware, UserData);
router.post("/requestPasswordReset", ResetPassword);
router.post("/resetPassword/:userId/:resetString", UpdatePassword);

module.exports = router;
