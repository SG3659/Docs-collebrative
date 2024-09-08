"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve the token from request headers
        const token = req.cookies['access_token'];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Auth failed: No token provided",
            });
        }
        // Verify the token
        jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Auth failed",
                });
            }
            else {
                // Decode token payload and assign
                const payload = decoded; // Cast to JwtPayload to ensure it has a known shape
                req.body.userId = payload.id;
                next();
            }
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token key",
        });
    }
});
exports.default = verify;
