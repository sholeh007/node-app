import express from "express";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";
import errorController from "./controller/Error.js";
import User from "./model/userModel.js";
import { run } from "./data/database.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//config pug engine
app.set("view engine", "pug");
app.set("views", "src/views");

app.use(shopRoute); //main route

app.use(async (req, res, next) => {
  const user = await User.findUser("6015018e3293c7f9a5abe584");
  if (!user) return res.send("Access denied");
  req.user = user;
  next();
});
app.use("/admin", adminRoute);

app.use(errorController[404]);

run(() => app.listen(3000));
