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
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalRating: {
      type: String,
    },
    buyers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models && "product" in mongoose.models
    ? mongoose.models.product
    : mongoose.model("product", productSchema);
export default Dataset;
