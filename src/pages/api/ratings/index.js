import auth from "@/middleware/auth";
import Product from "../../../models/productModel";
import db from "@/utils/connectDB";

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateRatings(req, res);
      break;
  }
};

const updateRatings = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const { star, productId, comment } = req.body;
      if (!star || !productId || !comment) {
        return res
          .status(400)
          .json({ err: "Please provide all required fields." });
      }
      await db.connect();
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(400).json({ err: "Product does not exist" });
      }
      let alreadyRated = product.ratings.find(
        (userId) => userId.postedBy.toString() === result.id.toString()
      );

      if (alreadyRated) {
        const ratingsUpdate = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          }
        );
      } else {
        const rateProduct = await Product.findByIdAndUpdate(productId, {
          $push: {
            ratings: {
              star: star,
              postedBy: result.id,
              comment: comment,
            },
          },
        });
      }
      let totalRating = product.ratings.length;

      let ratingSum = product.ratings.reduce((acc, curr) => acc + curr.star, 0);

      let actualRating = Math.round(ratingSum / totalRating);
      let finalProduct = await Product.findByIdAndUpdate(productId, {
        totalRating: actualRating,
      });
      await db.disconnect();
      return res.json({ status: "success", Data: finalProduct });
    }
    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
