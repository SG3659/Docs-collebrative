const express = require("express");
const router = express.Router();
const { CreateUser, Login } = require("../controller/authController");
const ApiRateLimiter = require("../middleware/attempts/apiRateLimiter");
router.post("/register", CreateUser);
router.post("/login", ApiRateLimiter, Login);
module.exports = router;
