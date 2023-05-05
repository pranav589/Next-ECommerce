import Users from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import db from "@/utils/connectDB";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const decryptPassword = CryptoJS.AES.decrypt(password, "secret key 1");
    const stringedPassword = decryptPassword.toString(CryptoJS.enc.Utf8);
    await db.connect();
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(stringedPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: "Invalid Password!" });
    }
    //if login is true
    const payload = { id: user?._id, name: user?.name };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });
    await db.disconnect();
    res.json({
      token,
      msg: "Login Success!",
      user: {
        email: user?.email,
        name: user?.name,
        avatar: user?.avatar,
        role: user?.role,
        root: user?.root,
      },
    });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};
