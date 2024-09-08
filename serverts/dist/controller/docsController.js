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
exports.deleteDoc = exports.findOrCreateDocument = exports.getAllDocs = void 0;
const document_1 = __importDefault(require("../model/document"));
const defaultData = "";
const findOrCreateDocument = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name }) {
    if (id == null)
        return;
    const document = yield document_1.default.findById(id);
    if (document)
        return document;
    const newDocument = yield document_1.default.create({ _id: id, name: name, data: defaultData });
    yield newDocument.save();
    return newDocument;
});
exports.findOrCreateDocument = findOrCreateDocument;
const getAllDocs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const Docs = yield document_1.default.find({ userId });
        // If there is a search query, filter documents by name
        const filterDocs = req.query.search
            ? Docs.filter((item) => item.name.includes(req.query.search))
            : Docs;
        // Send successful response with documents
        return res.json({
            success: true,
            data: filterDocs,
        });
    }
    catch (error) {
        console.error("Error fetching documents:", error);
        return res.json({
            success: false,
            message: "Docs not found",
        });
    }
});
exports.getAllDocs = getAllDocs;
const deleteDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const deleteDoc = yield document_1.default.findByIdAndDelete({ _id });
        if (!deleteDoc) {
            res.status(401).json({
                success: false,
                message: "DOcs is not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Delete"
        });
    }
    catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({
            success: false,
            message: "Docs not found",
        });
    }
});
exports.deleteDoc = deleteDoc;
