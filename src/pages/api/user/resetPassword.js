import connectDB from "@/utils/connectDB";
import User from "../../../models/userModel";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import auth from "@/middleware/auth";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await resetPassword(req, res);
      break;
  }
};

const resetPassword = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById({ _id: result.id });
    if (!user) {
      return res.status(400).json({ err: "User does not exist." });
    }

    const decryptOldPassword = CryptoJS.AES.decrypt(
      oldPassword,
      "secret key 1"
    );
    const decryptNewPassword = CryptoJS.AES.decrypt(
      newPassword,
      "secret key 1"
    );
    const stringedOldPassword = decryptOldPassword.toString(CryptoJS.enc.Utf8);
    const stringedNewPassword = decryptNewPassword.toString(CryptoJS.enc.Utf8);
    const isMatch = await bcrypt.compare(stringedOldPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ err: "Please enter correct old password!" });

    const passwordHash = await bcrypt.hash(stringedNewPassword, 12);
    await User.findOneAndUpdate({ _id: result.id }, { password: passwordHash });
    return res.json({
      status: "success",
      msg: "Password updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
