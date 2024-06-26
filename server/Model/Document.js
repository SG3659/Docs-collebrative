const { Schema, model } = require("mongoose");
const userDocument = new Schema(
  {
    _id: String,
    data: Object,
  },
  { timestamps: true }
);

module.exports = model("Document", userDocument);
