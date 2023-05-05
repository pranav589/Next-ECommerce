import db from "@/utils/connectDB";
import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await verify(req, res);
      break;
  }
};

const verify = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token)
      return res
        .status(400)
        .json({ err: "Invalid Signature", verification: false });
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
      if (err)
        return res
          .status(400)
          .json({ err: "Verification Failed", verification: false });
      await db.connect();
      const user = await Users.findById(verified.id);
      if (!user) return res.status(400).json({ err: "User not found" });
      await db.disconnect();
      return res.json({
        msg: "Verified",
        user: {
          email: user?.email,
          name: user?.name,
          avatar: user?.avatar,
          role: user?.role,
          root: user?.root,
          id: user?._id,
        },
        verification: true,
      });
    });
  } catch (error) {
    res.end();
    return res.status(500).json({ err: error.message });
  }
};
