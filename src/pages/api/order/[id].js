import db from "@/utils/connectDB";
import Orders from "../../../models/orderModel";
import auth from "@/middleware/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getOrder(req, res);
      break;
  }
};

const getOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;
    if (result.role === "admin" || result.root === true) {
      await db.connect();
      const order = await Orders.findById(id).populate("user", "-password");
      await db.disconnect();
      return res.json({ status: "success", Data: order });
    } else if (result.role !== "admin") {
      await db.connect();
      const order = await Orders.findById(id).populate("user", "-password");
      await db.disconnect();
      return res.json({ status: "success", Data: order });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
