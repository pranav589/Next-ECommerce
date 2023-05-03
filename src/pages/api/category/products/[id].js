import connectDB from "@/utils/connectDB";
import Products from "../../../../models/productModel";

connectDB();

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProductsFromCategory(req, res);
      break;
  }
};

const getProductsFromCategory = async (req, res) => {
  try {
    let { page, limit, id } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * limit;
    const query = [
      {
        $match: {
          $or: [{ category: id }],
        },
      },
      {
        $facet: {
          products: [
            {
              $skip: skip,
            },
            {
              $limit: parseInt(limit),
            },
            {
              $project: {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
              },
            },
          ],
          count: [
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          products: 1,
          totalCount: {
            $arrayElemAt: ["$count", 0],
          },
        },
      },
    ];
    const products = await Products.aggregate(query);
    return res.json({
      status: "success",
      Data: products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
