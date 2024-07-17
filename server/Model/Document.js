const { Schema, model } = require("mongoose");
const userDocument = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      default: "Untitled Document",
    },
    data: {
      type: Object,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Document", userDocument);
