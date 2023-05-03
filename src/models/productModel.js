import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
    },
    sold: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      trim: true,
    },
    type: {
      type: String,
      default: "regular",
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;
