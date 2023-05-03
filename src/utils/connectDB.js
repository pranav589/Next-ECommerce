import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      if (err) throw err;
      console.log("Connected to mongoDB");
    });
};

export default connectDB;
