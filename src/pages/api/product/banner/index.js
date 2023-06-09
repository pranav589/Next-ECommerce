import db from "@/utils/connectDB";
import Products from "../../../../models/productModel";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getBannerProducts(req, res);
      break;
  }
};

const getBannerProducts = async (req, res) => {
  try {
    await db.connect();
    const products = await Products.find({ type: "banner" });
    if (products?.length > 3) {
      return res
        .status(400)
        .json({ err: "Upto 3 products can be added in the banner" });
    }
    await db.disconnect();
    return res.json({
      status: "success",
      Data: products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
