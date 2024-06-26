const Document = require("./Model/Document");
require("dotenv").config();
require("./config/data").connect();

const io = require("socket.io")(5000, {
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
});

async function findOrCreateDocument(id) {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
