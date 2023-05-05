import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models && "category" in mongoose.models
    ? mongoose.models.category
    : mongoose.model("category", categorySchema);

export default Dataset;
