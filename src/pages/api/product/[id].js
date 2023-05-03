import connectDB from "@/utils/connectDB";
import Products from "../../../models/productModel";
import Categories from "../../../models/categoryModel";
import auth from "@/middleware/auth";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PATCH":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Products.findById(id);

    if (!product)
      return res.status(400).json({ err: "This Product does not exist." });

    const category = await Categories.findById(product.category);

    return res.json({
      status: "success",
      Data: product,
      category: category,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateProduct = async (req, res) => {
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
    const { id } = req.query;
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
    const updateProduct = await Products.findOneAndUpdate(
      { _id: id },
      {
        title: title.toLowerCase(),
        price,
        inStock,
        description,
        category,
        images,
        discount,
        discountPrice,
        type,
      }
    );
    return res.json({
      status: "success",
      msg: "Product updated successfully.",
      Data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;
    if (result.role !== "admin" || result.root === false) {
      return res.status(400).json({ err: "Unauthorized access" });
    }

    const deleteProduct = await Products.findOneAndDelete({ _id: id });
    return res.json({
      status: "success",
      msg: "Product Deleted.",
      Data: deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
