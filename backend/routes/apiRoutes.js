import { verifyToken } from "../controllers/auth/TokenController.js";
import { userDetails } from "../controllers/api/UserController.js";
import express from "express";
const router=express.Router();

router.get("/user",verifyToken,userDetails);

export default router;