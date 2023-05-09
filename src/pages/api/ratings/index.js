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
    case "POST":
      await createRatings(req, res);
      break;
    case "PUT":
      await updateRatings(req, res);
      break;
    case "DELETE":
      await deleteRatingsAndComment(req, res);
      break;
  }
};

const createRatings = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const { star, productId, comment } = req.body;
      if (!productId) {
        return res.status(400).json({ err: "Product not found" });
      }

      if (!star && !comment) {
        return res
          .status(400)
          .json({ err: "Either star rating or comment is necessary." });
      }
      await db.connect();
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(400).json({ err: "Product does not exist" });
      }

      const rateProduct = await Product.findByIdAndUpdate(productId, {
        $push: {
          ratings: {
            star: star,
            postedBy: result.id,
            comment: comment,
          },
        },
      });

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

const updateRatings = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const { star, productId, comment, ratingId } = req.body;
      if (!productId) {
        return res.status(400).json({ err: "Product not found" });
      }

      if (!ratingId) {
        return res.status(400).json({ err: "Rating not found." });
      }

      if (!star && !comment) {
        return res
          .status(400)
          .json({ err: "Either star rating or comment is necessary." });
      }
      await db.connect();
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(400).json({ err: "Product does not exist" });
      }

      let alreadyRated = product.ratings.find(
        (id) => id._id.toString() === ratingId.toString()
      );

      if (alreadyRated) {
        const ratingsUpdate = await Product.findOneAndUpdate(
          {
            "ratings._id": alreadyRated._id,
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          }
        );
        let totalRating = product.ratings.length;

        let ratingSum = product.ratings.reduce(
          (acc, curr) => acc + curr.star,
          0
        );

        let actualRating = Math.round(ratingSum / totalRating);
        let finalProduct = await Product.findByIdAndUpdate(productId, {
          totalRating: actualRating,
        });
        await db.disconnect();
        return res.json({ status: "success", Data: finalProduct });
      }
    }
    return res.status(400).json({ err: "Unauthorized access." });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const deleteRatingsAndComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { ratingId, productId, postedBy } = req.body;
    await db.connect();
    if (result?.id?.toString() === postedBy?.toString()) {
      const validateProduct = await Product.findById(productId);
      if (!validateProduct) {
        return res.statu(400).json({ err: "Invalid product" });
      }
      const validateRatings = validateProduct.ratings.filter(
        (ratings) => ratings?._id?.toString() === ratingId.toString()
      );
      if (validateRatings?.length > 0) {
        await Product.findByIdAndUpdate(productId, {
          $pull: {
            ratings: {
              _id: ratingId,
            },
          },
        });
        return res.json({
          status: "success",
          msg: "Review deleted successfully.",
        });
      }
      await db.disconnect();
      return res.status(400).json({ err: "Invalid review deletion request." });
    }
    return res.status(400).json({ err: "Unauthorized access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
