import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";
import authRoute from "../src/routes/auth.js";
import errorController from "./controller/Error.js";
import User from "./model/userModel.js";
import koneksi from "./data/database.js";

dotenv.config();
const app = express();
const mongoDBStore = connectMongoDBSession(session);
const store = new mongoDBStore({
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mzgug.mongodb.net/${process.env.DB_NAME}`,
  collection: "sessions",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    store,
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(async (req, res, next) => {
  if (!req.session.user) return next();
  try {
    const user = await User.findById(req.session.user._id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

//config pug engine
app.set("view engine", "pug");
app.set("views", "src/views");

app.use((req, res, next) => {
  res.locals.isLogin = req.session.login;
  next();
});

app.use(shopRoute); //main route
app.use("/admin", adminRoute);
app.use(authRoute);

app.use(errorController[404]);

koneksi(() => {
  app.listen(process.env.APP_PORT);
});
