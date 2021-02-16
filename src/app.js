import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";
import authRoute from "../src/routes/auth.js";
import errorController from "./controller/Error.js";
import User from "./model/userModel.js";
import koneksi from "./data/database.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

//config pug engine
app.set("view engine", "pug");
app.set("views", "src/views");

app.use(async (req, res, next) => {
  const user = await User.findById("6027627c22599a21d49e5aca");
  if (!user) return res.send("Access denied");
  // global user req
  req.user = user;
  next();
});

app.use((req, res, next) => {
  const cookies = req.get("Cookie");
  // create local variabel
  res.locals.isLogin = false;
  if (cookies) {
    const value = cookies.split("=")[1];
    if (value === "true") {
      res.locals.isLogin = true;
    }
  }
  next();
});

app.use(shopRoute); //main route
app.use("/admin", adminRoute);
app.use(authRoute);

app.use(errorController[404]);

koneksi(() => {
  User.findOne().then((user) => {
    if (!user) {
      const user_ = new User({
        name: "sholeh",
        email: "sayakamu@mail.com",
        cart: {
          items: [],
        },
      });
      user_.save();
    }
  });
  app.listen(process.env.APP_PORT);
});
