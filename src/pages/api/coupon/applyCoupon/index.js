import connectDB from "@/utils/connectDB";
import auth from "../../../../../middleware/auth";
import Coupon from "../../../../models/couponModel";
import Cart from "../../../../models/cartModel";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await applyCoupon(req, res);
      break;
  }
};

const applyCoupon = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { name, isApplied } = req.body;
    const { type } = req.query;

    const isExist = await Coupon.findOne({ name: name });
    if (!isExist) {
      return res.status(400).json({ err: "Coupon does not exist" });
    }

    if (isExist.expiry < new Date(Date.now())) {
      return res.status(400).json({ err: "Coupon is expired." });
    }
    const isCouponAlreadyUsed = isExist.users.find(
      (user) => user.toString() === result.id.toString()
    );
    if (isCouponAlreadyUsed) {
      return res.status(400).json({ err: "This coupon code is already used." });
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
        discount: isExist.discount,
        couponCode: isExist.name,
      }
    );

    const coupon = await isExist.updateOne({ users: result.id });

    return res.json({
      status: "success",
      msg: userCart?.couponCode === name ? "Coupon Removed" : "Coupon applied",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
