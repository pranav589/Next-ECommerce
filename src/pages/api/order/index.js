import connectDB from "@/utils/connectDB";
import Orders from "../../../models/orderModel";
import auth from "../../../../middleware/auth";

connectDB();

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getOrders(req, res);
      break;
    case "POST":
      await createOrder(req, res);
      break;
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await auth(req, res);

    let orders;
    let totalCount = 0;
    let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * limit;
    if (result.role === "admin" || result.root === true) {
      orders = await Orders.find()
        .populate("user", "-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      totalCount = await Orders.countDocuments();
    } else if (result.role === "user") {
      orders = await Orders.find({ user: result.id })
        .populate("user", "-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      totalCount = await Orders.find({ user: result.id }).countDocuments();
    }
    return res.json({
      status: "success",
      Data: {
        orders,
        totalCount,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { address, cart, total, couponCode, discount } = req.body;

    const newOrder = await Orders({
      user: result.id,
      cart,
      total,
      address,
      couponCode,
      discount,
    });

    await newOrder.save();

    return res.json({
      status: "success",
      Data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
