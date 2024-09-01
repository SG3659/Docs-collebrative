import { Schema, model, Document } from "mongoose";

export interface IResetPass extends Document {
  userId: string;
  resetString: string;
  createdAt: Date;
  expiresAt: Date;
}

// Schema for the Password Reset model
const resetPassSchema: Schema<IResetPass> = new Schema({
  userId: {
    type: String,
    required: true, 
  },
  resetString: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    required: true, 
  },
  expiresAt: {
    type: Date,
    required: true, 
  },
});

const passwordReset = model<IResetPass>("PasswordReset", resetPassSchema);

export default passwordReset;
