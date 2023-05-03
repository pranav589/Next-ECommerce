import connectDB from "@/utils/connectDB";
import Wishlist from "../../../models/wishlistModel";
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
    case "POST":
      await wishListProduct(req, res);
      break;
  }
};

const wishListProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { productId } = req.body;

    if (result.id) {
      const validateProduct = await Wishlist.findOne({ product: productId });
      if (!validateProduct) {
        const wishlist = new Wishlist({
          userId: result.id,
          product: productId,
        });
        return res.json({
          status: "success",
          Data: wishlist,
        });
      }
      return res.status(400).json({ err: "No product found." });
    }

    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};
