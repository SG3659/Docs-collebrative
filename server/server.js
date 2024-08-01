const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { createServer } = require("http");
const server = createServer(app);
const cookieparser = require("cookie-parser");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
const Document = require("./Model/Document");
require("dotenv").config();
require("./config/data").connect();
const userauth = require("./routes/authRoute");
const docsauth = require("./routes/docsRoute");

const __dirname = path.resolve();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const defaultValue = " ";
io.on("connection", (socket) => {
  console.log("user-connected", socket.id);
  // room
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-change", (delta) => {
      // console.log(delta)
      socket.broadcast.to(documentId).emit("receive-change", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
app.use(cookieparser());
app.use("/api/auth", userauth);
app.use("/api/docs", docsauth);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(port, (req, res) => {
  console.log(`server running at http://localhost:${port}`);
});
