import express from "express";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";
import errorController from "./controller/Error.js";

const app = express();

//config pug engine
app.set("view engine", "pug");
app.set("views", "src/views");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//route
app.use("/admin", adminRoute);
app.use(shopRoute);

// middleware for error 404
app.use(errorController[404]);

app.listen(3000);
