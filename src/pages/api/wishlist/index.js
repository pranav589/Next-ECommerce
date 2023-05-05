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
    case "GET":
      await getWishlistForLoggedUser(req, res);
      break;
  }
};

const getWishlistForLoggedUser = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.id) {
      await db.connect();
      const wishlistedProducts = await Wishlist.find({
        userId: result.id,
      }).populate({
        path: "product",
        model: "product",
      });
      await db.disconnect();
      return res.json({
        status: "success",
        Data: wishlistedProducts,
      });
    }

    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};
