"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const loginLimit_1 = __importDefault(require("../middleware/loginLimit"));
const router = express_1.default.Router();
router.post("/register", (req, res) => (0, authController_1.createUser)(req, res));
router.post("/login", loginLimit_1.default, (req, res) => (0, authController_1.loginUser)(req, res));
router.post("/get-user-info-by-id", (req, res) => (0, authController_1.userData)(req, res));
router.post("/requestPasswordReset", (req, res) => (0, authController_1.resetPassword)(req, res));
router.post("/resetPassword/:userId/:resetString", (req, res) => (0, authController_1.updatePassword)(req, res));
exports.default = router;
