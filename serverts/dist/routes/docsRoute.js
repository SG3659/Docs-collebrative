"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const docsController_1 = require("../controller/docsController");
router.get("/getAllDocs", (req, res) => {
    (0, docsController_1.getAllDocs)(req, res);
});
router.delete("/delete", (req, res) => {
    (0, docsController_1.deleteDoc)(req, res);
});
exports.default = router;
