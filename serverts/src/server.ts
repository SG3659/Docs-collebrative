import express, { Request, Response } from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connect from "./config/data";
import userauth from "./routes/authRoute";
import docsauth from "./routes/docsRoute"
import {  findOrCreateDocument} from"./controller/docsController"
import Document from"./model/document"
import cors from "cors"
dotenv.config();
connect();

const app = express();
const port= process.env.PORT ;
const server = createServer(app);

app.use(cors())
const io = new Server(server, {
  cors: {
    origin: 'https://docs-collebrative.vercel.app',
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cookieParser());

io.on("connection", (socket) => {
  // console.log("user-connected", socket.id);

  socket.on("get-document", async (documentId:string, documentName:string) => {
    socket.join(documentId);
    const document = await findOrCreateDocument({id:documentId,name:documentName});
   
    socket.emit("load-document", document?.data);
    socket.on("send-change", (delta) => {
      socket.broadcast.to(documentId).emit("receive-change", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });

  socket.on("sendMessage", (message: string) => {
    io.emit("message", message);
  });
});
app.use("/api/auth", userauth);
app.use("/api/docs", docsauth);
 
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
