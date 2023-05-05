import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      requried: true,
      trim: true,
    },
    password: {
      type: String,
      requried: true,
    },
    role: {
      type: String,
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models && "user" in mongoose.models
    ? mongoose.models.user
    : mongoose.model("user", userSchema);

export default Dataset;
