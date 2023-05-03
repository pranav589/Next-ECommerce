import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      requried: true,
    },
    address1: {
      type: String,
      requried: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      requried: true,
    },
    state: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.address || mongoose.model("address", addressSchema);

export default Dataset;
