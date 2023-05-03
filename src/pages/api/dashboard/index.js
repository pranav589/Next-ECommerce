import connectDB from "@/utils/connectDB";
import Orders from "../../../models/orderModel";
import Product from "../../../models/productModel";
import User from "../../../models/userModel";
import auth from "../../../../middleware/auth";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getDashboardSummary(req, res);
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result?.role === "admin" || result?.root === true) {
      const ordersCount = await Orders.find({
        payment_status: true,
      }).countDocuments();
      const ordersPriceGroup = await Orders.aggregate([
        {
          $match: {
            payment_status: true,
          },
        },
        {
          $group: {
            _id: null,
            sales: { $sum: "$total" },
          },
        },
      ]);

      const ordersPrice =
        ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

      const productsCount = await Product.countDocuments();
      const usersCount = await User.countDocuments();
      return res.json({
        status: "success",
        Data: {
          ordersCount,
          productsCount,
          usersCount,
          ordersPrice,
        },
      });
    }
    return res.status(400).json({ err: "Unauthorized Access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
