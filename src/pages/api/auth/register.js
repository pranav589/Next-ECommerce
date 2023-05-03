import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import bcrypt from "bcrypt";
import valid from "../../../utils/valid";
import CryptoJS from "crypto-js";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const decryptedPassword = CryptoJS.AES.decrypt(
      password,
      "secret key 1"
    ).toString(CryptoJS.enc.Utf8);
    const decryptedConfirmPassword = CryptoJS.AES.decrypt(
      confirmPassword,
      "secret key 1"
    ).toString(CryptoJS.enc.Utf8);

    const errorMessage = valid(
      name,
      email,
      decryptedPassword,
      decryptedConfirmPassword
    );
    if (errorMessage) return res.status(400).json({ err: errorMessage });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: "This email already exists." });

    const passwordHash = await bcrypt.hash(decryptedPassword, 12);
    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      confirmPassword: confirmPassword,
    });
    await newUser.save();
    res.json({ msg: "Register Success!" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
