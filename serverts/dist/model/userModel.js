"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email address"],
    },
    password: {
        type: String,
        require: true,
        minlength: [8, "Password must be at least 8 character long"],
        maxlength: [128, "Password must be less than 128 character long"],
        validate: {
            validator: function (value) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
                return regex.test(value);
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
        },
    },
    profileImageURL: {
        type: String,
        default: "./image/user.png",
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
