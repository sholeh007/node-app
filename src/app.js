import express from "express";
import path from "path";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use(shopRoute);

// middleware for error 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "src", "views", "404.html"));
});

app.listen(3000);
