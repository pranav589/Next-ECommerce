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
    case "POST":
      await addToCartForLogged(req, res);
      break;
    case "GET":
      await getCart(req, res);
      break;
    case "PATCH":
      await decreaseQuantity(req, res);
      break;
    case "DELETE":
      await removeItem(req, res);
      break;
  }
};

const addToCartForLogged = async (req, res) => {
  try {
    const result = await auth(req, res);
    const products = req.body;
    await db.connect();
    if (result.id) {
      let cart = await Cart.findOne({ userId: result.id });
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
              !cart.products.some(
                ({ productId: id2 }) => id2.toString() === id1
              )
          );

          let final = [...cart.products, ...unique1];
          cart["products"] = final;

          cart = await cart.save();
          await db.disconnect();
          return res.status(201).json({ status: "success", Data: cart });
        }
      } else {
        const newCart = await Cart.create({
          userId: result.id,
          products: products,
        });
        await db.disconnect();
        return res.status(201).json({ status: "success", Data: newCart });
      }
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      await db.connect();
      const cart = await Cart.find({ userId: result.id }).populate({
        path: "products",
        populate: {
          path: "productId",
          model: "product",
        },
      });

      if (cart?.length === 0) {
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
        Data: { cart, totalAmount },
      });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const result = await auth(req, res);
    const products = req.body;
    await db.connect();
    if (result.id) {
      let cart = await Cart.findOne({ userId: result.id });

      if (cart) {
        if (products?.length > 0) {
          cart.products.forEach((obj) => {
            const elementInArr2 = products.find(
              (o) => o.productId === obj.productId.toString()
            );

            if (elementInArr2 && obj?.quantity > 1)
              obj.quantity = obj.quantity - elementInArr2.quantity;
          });
          let unique1 = products.filter(
            ({ productId: id1 }) =>
              !cart.products.some(
                ({ productId: id2 }) => id2.toString() === id1
              )
          );

          let final = [...cart.products, ...unique1];
          cart["products"] = final;
          cart = await cart.save();

          return res.status(201).json({ status: "success", Data: cart });
        }
      }
      await db.disconnect();
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { productId } = req.body;
    if (result.id) {
      await db.connect();
      let cart = await Cart.findOne({ userId: result.id });
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
            await Cart.findOneAndDelete({ userId: result.id });
            return res.json({ status: "success", msg: "Cart Deleted" });
          }
          cart["products"] = finalCart;
          cart = await cart.save();
          return res.status(201).json({ status: "success", Data: cart });
        }
      }
      await db.disconnect();
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
