const express = require("express");
const router = express.Router();
const AuthMiddleware =require("../middleware/VerifyToken/authorization")
const { getAllDocs } = require("../controller/docsController");
router.get("/getAllDocs/", AuthMiddleware, getAllDocs);

module.exports = router;
