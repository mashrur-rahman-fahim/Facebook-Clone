import express from "express";
import { registerUser } from "../controllers/auth/RegisterController.js";
import { loginUser } from "../controllers/auth/LoginController.js";
import {
  renewAccessToken,
  verifyToken,
} from "../controllers/auth/TokenController.js";
import { logout } from "../controllers/auth/LogoutController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logout);
router.get("/refresh-token", renewAccessToken);

export default router;
