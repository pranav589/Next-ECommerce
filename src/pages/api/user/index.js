import db from "@/utils/connectDB";
import User from "../../../models/userModel";
import auth from "@/middleware/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateProfile(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role === "admin" || result.root === true) {
      let { page, limit } = req.query;
      if (!page) page = 1;
      if (!limit) limit = 10;

      const skip = (page - 1) * limit;
      await db.connect();
      const users = await User.find()
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      let totalCount = await User.countDocuments();
      await db.disconnect();
      return res.json({ status: "success", Data: { users, totalCount } });
    }
    return res.status(400).json({ err: "Unauthorized access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name } = req.body;
    const user = await User.findById({ _id: result.id });
    if (!user) {
      return res.status(400).json({ err: "User does not exist." });
    }
    await User.findOneAndUpdate({ _id: result.id }, { name: name });
    return res.json({
      status: "success",
      msg: "Password updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
