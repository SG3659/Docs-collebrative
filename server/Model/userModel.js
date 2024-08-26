const { Schema, model } = require("mongoose");
const validator = require("validator");
const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    password: {
      type: String,
      require: true,
      minlength: [8, "Password must be at least 8 character long"],
      maxlength: [128, "Password must be less than 128 character long"],
      validate: {
        validator: function (value) {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
          return regex.test(value);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
      },
    },
    profileImageURL: {
      type: String,
      default: "./image/user.png",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("User", userSchema);
