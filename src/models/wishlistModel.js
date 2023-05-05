import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models && "wishlist" in mongoose.models
    ? mongoose.models.wishlist
    : mongoose.model("wishlist", wishlistSchema);

export default Dataset;
