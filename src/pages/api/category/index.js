import connectDB from "@/utils/connectDB";
import Categories from "../../../models/categoryModel";
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
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategories(req, res);
      break;
  }
};

const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, image } = req.body;
    if (result.role !== "admin" || result.root === false) {
      return res.status(400).json({ err: "Unauthorized access" });
    }
    if (name?.length === 0 || image?.length === 0) {
      return res.status(400).json({ err: "Name and image is required" });
    }
    const newCategory = new Categories({ name, image });
    await newCategory.save();
    return res.json({
      status: "success",
      msg: "Category created successfully.",
      Data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * limit;
    const categories = await Categories.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalCount = await Categories.countDocuments();
    return res.json({
      status: "success",
      Data: { categories, totalCount },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
