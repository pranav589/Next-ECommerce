import db from "@/utils/connectDB";
import Cart from "../../../../models/cartModel";

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCartForGuest(req, res);
      break;
    case "PATCH":
      await decreaseQuantityForGuest(req, res);
      break;
    case "DELETE":
      await removeItemForGuest(req, res);
      break;
  }
};

const getCartForGuest = async (req, res) => {
  try {
    const { id } = req.query;
    await db.connect();

    const cart = await Cart.find({ _id: id }).populate({
      path: "products",
      populate: {
        path: "productId",
        model: "product",
      },
    });
    if (!cart) {
      return res.json({ status: "success", msg: "Nothing in the cart." });
    }

    const totalFormat = cart[0];

    const totalAmount = totalFormat.products?.reduce(
      (acc, curr) =>
        curr?.productId?.discount > 0
          ? acc + curr?.productId?.discountPrice * curr.quantity
          : acc + curr?.productId?.price * curr?.quantity,
      0
    );
    await db.disconnect();
    return res.json({
      status: "success",
      Data: cart,
      totalAmount: totalAmount,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const decreaseQuantityForGuest = async (req, res) => {
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
          if (obj.quantity === 1) {
            return res.status(400).json({
              err: "Cannot decrease the quantity of item. You can click on delete icon to remove it from the cart.",
            });
          }
          if (elementInArr2 && obj?.quantity > 1)
            obj.quantity = obj.quantity - elementInArr2.quantity;
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
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const removeItemForGuest = async (req, res) => {
  try {
    const { cartId, productId } = req.body;

    let cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return res
        .status(400)
        .json({ err: "Cart does not exist for this user." });
    }
    if (!productId) {
      return res.status(400).json({ err: "This product does not exist." });
    }
    if (cart) {
      if (productId) {
        let finalCart = cart.products.filter(
          (obj) => obj.productId.toString() !== productId
        );

        if (finalCart?.length === 0) {
          await Cart.findOneAndDelete({ _id: cartId });
          return res.json({ status: "success", msg: "Cart Deleted" });
        }
        cart["products"] = finalCart;
        cart = await cart.save();
        return res.status(201).json({ status: "success", Data: cart });
      }
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
