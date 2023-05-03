import connectDB from "@/utils/connectDB";
import Coupon from "../../../models/couponModel";
import auth from "@/middleware/auth";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCoupon(req, res);
      break;
    case "GET":
      await getCoupons(req, res);
  }
};

const createCoupon = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, expiry, discount } = req.body;
    if (result.role === "admin" || result.root === true) {
      const isExist = await Coupon.findOne({ name: name });
      if (isExist) {
        return res
          .status(400)
          .json({ err: "Coupon of this name already exist." });
      }
      const newCoupon = await Coupon.create({ name, expiry, discount });

      return res.json({ status: "success", Data: newCoupon });
    }
    return res.status(400).json({ err: "Unauthorized access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getCoupons = async (req, res) => {
  try {
    let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * limit;
    const result = await auth(req, res);
    console.log({ result });
    if (result.role === "admin" || result.root === true) {
      const couponCount = await Coupon.countDocuments();
      const coupons = await Coupon.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return res.json({
        status: "success",
        Data: {
          coupons,
          totalCount: couponCount,
        },
      });
    }
    return res.status(400).json({ err: "Unauthorized access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
