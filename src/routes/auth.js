import express from "express";
import authController from "../controller/Auth.js";

const router = express.Router();
const auth = new authController();

router.route("/login").get(authController.getIndex).post(auth.login);
router.get("/logout", authController.logout);

export default router;
