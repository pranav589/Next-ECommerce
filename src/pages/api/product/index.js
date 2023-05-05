import db from "@/utils/connectDB";
import Products from "../../../models/productModel";
import auth from "@/middleware/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    let { page, limit } = req.query;

    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * limit;
    await db.connect();
    const totalCount = await Products.countDocuments();
    const products = await Products.find()
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    await db.disconnect();
    res.json({
      status: "success",
      result: products.length,
      Data: products,
      totalCount: totalCount,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    const {
      title,
      price,
      inStock,
      description,
      category,
      images,
      discount,
      type,
    } = req.body;
    if (result.role !== "admin" || result.root === false) {
      return res.status(400).json({ err: "Unauthorized access" });
    }
    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !category ||
      images?.length === 0
    ) {
      return res
        .status(400)
        .json({ err: "Please provide all the required fields" });
    }
    const discountPrice = discount
      ? Math.floor(price - (price * discount) / 100)
      : null;
    await db.connect();
    const newProduct = new Products({
      title: title.toLowerCase(),
      price,
      inStock,
      description,
      category,
      images,
      discount,
      discountPrice,
      type,
    });
    await newProduct.save();
    await db.disconnect();
    return res.json({
      status: "success",
      msg: "Product created successfully.",
      Data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
