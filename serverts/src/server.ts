import express, { Request, Response } from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
// import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import Document from "./model/document";
import connect from "./config/data";
import userauth from "./routes/authRoute";
import docsauth from "./routes/docsRoute"

dotenv.config();
connect();

const app = express();
const port= process.env.PORT || 5000;
const server = createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const defaultValue = " ";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

io.on("connection", (socket) => {
  console.log("user-connected", socket.id);

  socket.on("get-document", async (documentId: string) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
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

async function findOrCreateDocument(id: string) {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}

app.use("/api/auth", userauth);
app.use("/api/docs", docsauth);

// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });


 
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
