import mongoose from "mongoose";
import dotnenv from "dotenv";

dotnenv.config();
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mzgug.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const koneksi = async (callback) => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    callback();
  } catch (err) {
    console.error(err);
  }
};

export default koneksi;
