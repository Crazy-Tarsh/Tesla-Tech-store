import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    ip: String,
    success: { type: Boolean, default: false },
    reason: String
  },
  { timestamps: true }
);

export default mongoose.model("LoginAttempt", loginAttemptSchema);
