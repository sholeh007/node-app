import express from "express";
import dotenv from "dotenv";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";
import errorController from "./controller/Error.js";
// import User from "./model/userModel.js";
import koneksi from "./data/database.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//config pug engine
app.set("view engine", "pug");
app.set("views", "src/views");

app.use(async (req, res, next) => {
  const user = await User.findUser("6015018e3293c7f9a5abe584");
  if (!user) return res.send("Access denied");
  req.user = new User(user.username, user.email, user.cart, user._id);
  next();
});
app.use(shopRoute); //main route
app.use("/admin", adminRoute);

app.use(errorController[404]);

koneksi(() => {
  app.listen(process.env.APP_PORT);
});
