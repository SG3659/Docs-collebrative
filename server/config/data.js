const Mongoose = require("mongoose");
require("dotenv").config;

exports.connect = () => {
  Mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((err) => {
      console.log("DB connection issues");
      console.error(err);
    });
};
