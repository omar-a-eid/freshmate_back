import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, minlength: 6 },
  gender: {
    ar: { type: String, enum: ["ذكر", "انثى"], required: true },
    en: { type: String, enum: ["male", "female"], required: true },
  },
  admin: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
