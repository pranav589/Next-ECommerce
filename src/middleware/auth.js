import jwt from "jsonwebtoken";
import User from "../models/userModel";
import db from "@/utils/connectDB";

const auth = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({ err: "Invalid Authentication" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) return res.status(400).json({ err: "Invalid Authorization" });
    await db.connect();
    const user = await User.findOne({ _id: decoded.id });
    await db.disconnect();
    return {
      id: user._id,
      role: user.role,
      root: user.root,
    };
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export default auth;
