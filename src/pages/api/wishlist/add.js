import db from "@/utils/connectDB";
import Wishlist from "../../../models/wishlistModel";
import auth from "@/middleware/auth";

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
      await db.connect();
      const validateProduct = await Wishlist.findOne({
        product: productId,
        userId: result.id,
      });
      if (!validateProduct) {
        const wishlist = new Wishlist({
          userId: result.id,
          product: productId,
        });
        await wishlist.save();
        return res.json({
          status: "success",
          Data: wishlist,
        });
      }
      await db.disconnect();
      return res.status(400).json({ err: "Product Already Wishlisted" });
    }

    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};
