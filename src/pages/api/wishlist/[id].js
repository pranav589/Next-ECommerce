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
    case "DELETE":
      await removeWishlist(req, res);
      break;
  }
};

const removeWishlist = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { productId } = req.body;

    if (result.id) {
      const validateProduct = await Wishlist.findOneAndDelete({
        product: productId,
        userId: result.id,
      });
      return res.json({
        status: "success",
        msg: "Wishlist Removed",
      });
    }

    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};
