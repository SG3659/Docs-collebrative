const { Schema, model } = require("mongoose");
const userDocument = new Schema(
  {
    _id: {
      type: String,
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
