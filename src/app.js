import express from "express";
import path from "path";
import dir from "./helper/path.js";
import { Router } from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";

const app = express();

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/admin", Router);
app.use(shopRoute);

// middleware for error 404
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000);
