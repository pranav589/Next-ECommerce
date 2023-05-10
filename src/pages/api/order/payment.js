import db from "@/utils/connectDB";
import Orders from "../../../models/orderModel";
import auth from "@/middleware/auth";
import Products from "../../../models/productModel";
import Cart from "../../../models/cartModel";

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await orderPayment(req, res);
      break;
  }
};

const orderPayment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const {
      orderId,
      name,
      amount,
      paymentId,
      method,
      subTotal,
      paymentStatus,
      dateOfPayment,
    } = req.body;
    await db.connect();
    const updateOrder = await Orders.findOneAndUpdate(
      { _id: orderId },
      {
        $set: {
          user: name,
          total: amount,
          paymentId: paymentId,
          method: method,
          subTotal: subTotal,
          payment_status: paymentStatus,
          dateOfPayment: dateOfPayment,
        },
      }
    );
    await db.disconnect();

    updateOrder.cart.filter((item) => {
      return sold(
        item.productId._id,
        item.quantity,
        item.productId?.inStock,
        item.productId?.sold,
        updateOrder.user
      );
    });

    const removeFromCart = await Cart.findOneAndDelete({ userId: result.id });

    return res.json({
      status: "success",
      msg: "Payment Done",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const sold = async (id, quantity, oldInStock, oldSold, userId) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
      sold: quantity + oldSold,

      $push: {
        buyers: {
          userId: userId,
        },
      },
    }
  );
};
