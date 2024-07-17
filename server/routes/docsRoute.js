const express = require("express");
const router = express.Router();
const AuthMiddleware =require("../middleware/VerifyToken/authorization")
const { getAllDocs } = require("../controller/docsController");
router.get("/getAllDocs/",getAllDocs);

module.exports = router;
