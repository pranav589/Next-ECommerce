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
    case "PATCH":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;
    const { name, image } = req.body;
    if (result.role !== "admin" || result.root === false) {
      return res.status(400).json({ err: "Unauthorized access" });
    }
    if (name?.length === 0 || image?.length === 0) {
      return res.status(400).json({ err: "Name and image is required" });
    }
    const updateCategory = await Categories.findOneAndUpdate(
      { _id: id },
      {
        name,
        image,
      }
    );
    return res.json({
      status: "success",
      Data: updateCategory,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;
    if (result.role !== "admin" || result.root === false) {
      return res.status(400).json({ err: "Unauthorized access" });
    }

    const deleteCategory = await Categories.findOneAndDelete({ _id: id });
    return res.json({
      status: "success",
      msg: "Category Deleted.",
      Data: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
