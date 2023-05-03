import connectDB from "@/utils/connectDB";
import User from "../../../models/userModel";
import auth from "../../../../middleware/auth";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateUserRole(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result?.role === "admin" || result?.root === true) {
      const { userId, role, name } = req.body;
      const user = await User.findOne({ _id: userId });
      if (user.root === true) {
        return res.status(400).json({ err: "Root user cannot be updated." });
      }

      await User.updateOne(
        { _id: userId },
        {
          role: role,
          name: name,
        }
      );

      return res.json({ status: "success", msg: "User role updated!" });
    }
    return res.status(400).json({ err: "Unauthorized access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result?.role === "admin" || result?.root === true) {
      const { id } = req.query;
      const user = await User.findOne({ _id: id });
      if (user.root === true) {
        return res.status(400).json({ err: "Root user cannot be deleted!" });
      }
      await User.deleteOne({ _id: id });
      return res.json({ status: "success", msg: "User deleted!" });
    }
    return res.status(400).json({ err: "Unauthorized access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
