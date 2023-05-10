import db from "@/utils/connectDB";
import Cart from "../../../models/cartModel";
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
      await deleteCart(req, res);
      break;
  }
};

const deleteCart = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.id) {
      await db.connect();
      let cart = await Cart.findOneAndDelete({ userId: result.id });
      if (!cart) {
        await db.disconnect();
        return res
          .status(400)
          .json({ err: "Cart does not exist for this user." });
      }

      await db.disconnect();
      return res.json({ status: "success", msg: "Cart Deleted" });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
