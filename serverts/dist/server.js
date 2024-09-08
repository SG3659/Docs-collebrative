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
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const data_1 = __importDefault(require("./config/data"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const docsRoute_1 = __importDefault(require("./routes/docsRoute"));
const docsController_1 = require("./controller/docsController");
const document_1 = __importDefault(require("./model/document"));
dotenv_1.default.config();
(0, data_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
io.on("connection", (socket) => {
    // console.log("user-connected", socket.id);
    socket.on("get-document", (documentId, documentName) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(documentId);
        const document = yield (0, docsController_1.findOrCreateDocument)({ id: documentId, name: documentName });
        socket.emit("load-document", document === null || document === void 0 ? void 0 : document.data);
        socket.on("send-change", (delta) => {
            socket.broadcast.to(documentId).emit("receive-change", delta);
        });
        socket.on("save-document", (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield document_1.default.findByIdAndUpdate(documentId, { data });
        }));
    }));
    socket.on("sendMessage", (message) => {
        io.emit("message", message);
    });
});
app.use("/api/auth", authRoute_1.default);
app.use("/api/docs", docsRoute_1.default);
server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
