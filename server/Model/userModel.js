const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
// Hash password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    const salt = await bcrypt.genSalt(16);
    const hashpass = await bcrypt.hash(user.password, salt);
    user.password = hashpass;
    next();
  } else {
    return next();
  }
});
// compare password with hashed password in database

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
// Increment login count when user logs in
userSchema.methods.incrementLoginCount = function () {
  this.loginCount += 1;
  return this.save();
};
// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PASSWORD, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.statics.findByToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    return this.findOne({ _id: decoded._id });
  } catch (err) {
    throw new Error(`Error verifying token: ${err.message}`);
  }
};

module.exports = model("User", userSchema);
