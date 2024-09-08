"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userDocument = new mongoose_1.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        require: true,
        default: 'Untitled Document'
    },
    data: {
        type: Object,
    },
    createdAt: {
        type: Date,
    },
}, { timestamps: true });
const documentModel = (0, mongoose_1.model)("Document", userDocument);
exports.default = documentModel;
