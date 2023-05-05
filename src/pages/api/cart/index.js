import db from "@/utils/connectDB";
import Cart from "../../../models/cartModel";

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await addToCartForGuest(req, res);
      break;
  }
};

const addToCartForGuest = async (req, res) => {
  try {
    const { cartId, products } = req.body;
    await db.connect();
    let cart = await Cart.findOne({ _id: cartId });
    if (cart) {
      if (products?.length > 0) {
        cart.products.forEach((obj) => {
          const elementInArr2 = products.find(
            (o) => o.productId === obj.productId.toString()
          );

          if (elementInArr2)
            obj.quantity = obj.quantity + elementInArr2.quantity;
        });
        let unique1 = products.filter(
          ({ productId: id1 }) =>
            !cart.products.some(({ productId: id2 }) => id2.toString() === id1)
        );

        let final = [...cart.products, ...unique1];
        cart["products"] = final;

        cart = await cart.save();
        await db.disconnect();
        return res.status(201).json({ status: "success", Data: cart });
      }
    } else {
      const newCart = await Cart.create({
        products: products,
      });
      await db.disconnect();
      return res.status(201).json({ status: "success", Data: newCart });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
