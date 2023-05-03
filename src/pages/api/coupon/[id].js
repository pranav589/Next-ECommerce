import connectDB from "@/utils/connectDB";
import auth from "../../../../middleware/auth";
import Coupon from "../../../models/couponModel";

connectDB();

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteCoupon(req, res);
      break;
    case "PATCH":
      await updateCoupon(req, res);
      break;
    case "GET":
      await getCoupon(req, res);
      break;
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;
    if (result.role === "admin" || result.root === true) {
      const coupon = await Coupon.findOneAndDelete({ _id: id });

      return res.json({
        status: "success",
        Data: coupon,
        msg: "Coupon deleted.",
      });
    }
    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;
    const { name, expiry, discount } = req.body;
    if (result.role === "admin" || result.root === true) {
      const coupon = await Coupon.findOneAndUpdate(
        { _id: id },
        {
          name,
          expiry,
          discount,
        }
      );

      return res.json({
        status: "success",
        Data: coupon,
      });
    }
    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getCoupon = async (req, res) => {
  try {
    const { id: name } = req.query;
    const result = await auth(req, res);
    if (result.id) {
      const coupon = await Coupon.find({ name: name });
      if (!coupon) {
        return res.status(400).json({ err: "Invalid coupon" });
      }
      return res.json({
        status: "success",
        Data: coupon,
        msg: "Coupon Applied",
      });
    }

    return res.status(400).json({ err: "Token not found" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
