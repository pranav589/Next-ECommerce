import auth from "@/middleware/auth";
import Product from "../../../../models/productModel";
import db from "@/utils/connectDB";

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllRatings(req, res);
      break;
  }
};

const getAllRatings = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ err: "Product Id is not valid" });
    }
    await db.connect();
    const validateProduct = await Product.find({ _id: id }).populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        model: "user",
      },
    });

    if (!validateProduct) {
      return res.status(400).json({ err: "Product not found." });
    }
    await db.disconnect();
    return res.json({
      status: "success",
      Data: validateProduct[0].ratings,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
