import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    customerId: {
      type: String,
    },
    address: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
    },
    method: {
      type: String,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: {
      type: Date,
    },
    subTotal: {
      type: Number,
    },
    dateOfOrder: {
      type: Date,
      default: Date.now(),
    },
    dateOfDelivery: {
      type: Date,
    },
    couponCode: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models && "order" in mongoose.models
    ? mongoose.models.order
    : mongoose.model("order", orderSchema);
export default Dataset;
