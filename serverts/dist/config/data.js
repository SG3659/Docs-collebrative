"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const connect = () => {
    const mongoUri = process.env.MONGODB_URL;
    if (!mongoUri) {
        console.error("MONGODB_URL is not defined in the environment variables.");
        return;
    }
    mongoose_1.default
        .connect(process.env.MONGODB_URL)
        .then(() => {
        console.log("DB connected");
    })
        .catch((err) => {
        console.log("DB connection problem");
        console.error(err);
    });
};
// const mongoUri:string = process.env.MONGODB_URL as string ;
// const connect = async () => {
//   try {
//     if (!mongoUri) {
//       throw new Error("MONGODB_URL is not defined in the environment variables.");
//     }
//     await Mongoose.connect(mongoUri);
//     console.log("DB connected successfully");
//   } catch (error) {
//     console.error("DB connection error:", error);
//   }
// };
exports.default = connect;
