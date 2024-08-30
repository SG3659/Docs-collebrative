import { Schema, model,Document } from "mongoose";
import validator from "validator"
export interface IUser extends Document{
   username:string,
   email:string,
   password:string,
   profileImageURL:string,
}
const userSchema:Schema<IUser> = new Schema(
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
        validator: function (value:string):boolean {
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
const User =model<IUser>("User",userSchema)
export default User 