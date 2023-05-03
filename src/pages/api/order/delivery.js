import connectDB from "@/utils/connectDB";
import Orders from "../../../models/orderModel";
import auth from "@/middleware/auth";

connectDB();

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await deliverOrder(req, res);
      break;
  }
};

const deliverOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { orderId, payment_status } = req.body;
    if (result.role === "admin" || result.root === true) {
      const updateOrder = await Orders.findOneAndUpdate(
        { _id: orderId },
        {
          delivered: payment_status === true ? true : false,
          dateOfDelivery: payment_status === true ? Date.now() : "",
        }
      );
      return res.json({ status: "success", msg: "Order Delivered!" });
    }
    return res.status(400).json({ err: "Unauthorized access!" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
