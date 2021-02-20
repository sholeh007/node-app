import express from "express";
import authController from "../controller/Auth.js";

const router = express.Router();
const auth = new authController();

router.route("/login").get(authController.getIndex).post(auth.login);
router.route("/signup").get(authController.getSignup).post(auth.signup);
router.get("/logout", authController.logout);

export default router;
