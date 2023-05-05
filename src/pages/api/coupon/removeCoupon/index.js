import Coupon from "../../../../models/couponModel";
import Cart from "../../../../models/cartModel";
import auth from "@/middleware/auth";
import db from "@/utils/connectDB";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await removeCoupon(req, res);
      break;
  }
};

const removeCoupon = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { name, isApplied } = req.body;
    const { type } = req.query;
    await db.connect();
    const isExist = await Coupon.findOne({ name: name });
    if (!isExist) {
      return res.status(400).json({ err: "Coupon does not exist" });
    }

    const userCart = await Cart.findOne({ userId: result.id }).populate({
      path: "products",
      populate: {
        path: "productId",
        model: "product",
      },
    });
    if (!userCart) {
      return res.status(400).json({ err: "No cart found" });
    }

    await Cart.findOneAndUpdate(
      { userId: result.id },
      {
        discount: 0,
        couponCode: "",
      }
    );

    const coupon = await isExist.updateOne({ users: result.id });
    await db.disconnect();
    return res.json({
      status: "success",
      msg: "Coupon Removed",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
