const express = require("express");
const router = express.Router();
const { CreateUser, Login, UserData } = require("../controller/authController");
const ApiRateLimiter = require("../middleware/attempts/apiRateLimiter");
const authmiddleware = require("../middleware/VerifyToken/authorization");
router.post("/register", CreateUser);
router.post("/login", ApiRateLimiter, Login);
router.post("/get-user-info-by-id", authmiddleware, UserData);
module.exports = router;
