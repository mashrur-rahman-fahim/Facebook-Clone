import express from "express";
import { registerUser } from "../controllers/auth/RegisterController.js";
import { loginUser } from "../controllers/auth/LoginController.js";
import {
  renewAccessToken,
  verifyToken,
} from "../controllers/auth/TokenController.js";
import { logout } from "../controllers/auth/LogoutController.js";
import { forgotPassowrd } from "../controllers/auth/ForgotPassController.js";
import { resetPass, verifyCode } from "../controllers/auth/ResetPassController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logout);
router.get("/refresh-token", renewAccessToken);
router.post("/forgot-password",forgotPassowrd);
router.post("/verify-code",verifyCode);
router.post("/reset-password",resetPass);
export default router;
