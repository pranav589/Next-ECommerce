import connectDB from "@/utils/connectDB";
import Address from "../../../models/addressModel";
import auth from "../../../../middleware/auth";

connectDB();

export const config = {
  api: {
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await addAddress(req, res);
      break;
    case "GET":
      await getAddress(req, res);
      break;
    case "PUT":
      await updateAddress(req, res);
      break;
  }
};

const addAddress = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { userId, name, address1, address2, city, state, phone } = req.body;
    const user = await Address.find({ userId: result.id });
    if (user?.length > 0) {
      return res.status(400).json({
        err: "Address for this user already exist. Try to edit the existing one.",
      });
    }
    const newAddress = new Address({
      userId: result.id,
      name,
      address1,
      address2,
      city,
      state,
      phone,
    });
    await newAddress.save();
    return res.json({
      status: "success",
      Data: newAddress,
    });
  } catch (error) {
    return res?.status(500).json({ err: error.message });
  }
};

const getAddress = async (req, res) => {
  try {
    const result = await auth(req, res);

    const address = await Address.find({ userId: result.id });
    if (!address) {
      return res.status(400).json({ err: "No address found!" });
    }
    return res.json({
      status: "success",
      Data: address,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { name, address1, address2, city, state, phone } = req.body;
    const result = await auth(req, res);

    const address = await Address.findOneAndUpdate(
      { userId: result.id },
      {
        name,
        address1,
        address2,
        city,
        state,
        phone,
        userId: result.id,
      }
    );
    if (!address) {
      return res.status(400).json({ err: "No address found!" });
    }
    return res.json({
      status: "success",
      Data: address,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
