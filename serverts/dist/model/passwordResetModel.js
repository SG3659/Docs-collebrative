"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema for the Password Reset model
const resetPassSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    resetString: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});
const passwordReset = (0, mongoose_1.model)("PasswordReset", resetPassSchema);
exports.default = passwordReset;
