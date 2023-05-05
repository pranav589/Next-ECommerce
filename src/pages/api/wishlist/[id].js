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
    case "DELETE":
      await removeFromWishlist(req, res);
      break;
    case "GET":
      await isItemWishlisted(req, res);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { id } = req.query;

    if (result.id) {
      await db.connect();
      const validateProduct = await Wishlist.findOneAndDelete({
        product: id,
        userId: result.id,
      });
      if (!validateProduct) {
        return res
          .status(400)
          .json({ err: "This item is not wishlisted by you." });
      }
      await db.disconnect();
      return res.json({
        status: "success",
        msg: "Item is removed from wishlist",
      });
    }

    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};

const isItemWishlisted = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const validateProduct = await Wishlist.findOne({
        product: id,
        userId: result.id,
      });
      if (!validateProduct) {
        return res
          .status(400)
          .json({ err: "This item is not wishlisted by you." });
      }

      return res.json({
        status: "success",
        Data: validateProduct,
      });
    }

    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};
