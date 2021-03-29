import express from "express";
import fs from "fs";
import path from "path";
import session from "express-session";
import csrf from "csurf";
import flash from "connect-flash-plus";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import connectMongoDBSession from "connect-mongodb-session";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";
import authRoute from "../src/routes/auth.js";
import errorController from "./controller/Error.js";
import User from "./model/userModel.js";
import koneksi from "../config/database.js";
import fileUpload from "../config/file-upload.js";
import __dirname from "./helper/path.js";

const app = express();
const mongoDBStore = connectMongoDBSession(session);
const store = new mongoDBStore({
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mzgug.mongodb.net/${process.env.DB_NAME}`,
  collection: "sessions",
});
const csrfProtection = csrf();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "..", "access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload);
app.use(express.static("public"));
app.use(
  session({
    store,
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(csrfProtection);

app.use(async (req, res, next) => {
  if (!req.session.user) return next();
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return next();
    req.user = user;
    next();
  } catch (err) {
    next(new Error(err));
  }
});

//config pug engine
app.set("view engine", "pug");
app.set("views", "src/views");

// create variable local
app.use((req, res, next) => {
  res.locals.isLogin = req.session.login;
  res.locals.csrfToken = req.csrfToken();
  res.locals.oldInput = function (name) {
    return req.body[name];
  };
  if (!req.user) return next();
  res.locals.roleUser = req.user.role;
  next();
});

app.use(shopRoute); //main route
app.use("/admin", adminRoute);
app.use(authRoute);

app.get("/500", errorController[500]);
app.use(errorController[404]);
app.use((error, req, res, next) => {
  res.redirect("/500");
});

koneksi(() => {
  app.listen(process.env.APP_PORT || 3000);
});
