import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 2,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
