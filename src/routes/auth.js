import express from "express";
import authController from "../controller/Auth.js";

const router = express.Router();
const auth = new authController();

router.route("/login").get(authController.getIndex).post(auth.login);
router.route("/signup").get(authController.getSignup).post(auth.signup);
router.post("/logout", authController.logout);
router.get("/forgot-password", authController.forgotPassword);
router.post("/reset-password", auth.resetPassword);
router.get("/reset/:token", authController.verificationReset);
router.post("/new-password", auth.newPassword);

export default router;
