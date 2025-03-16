import { verifyToken } from "../controllers/auth/TokenController.js";
import { indentity, userDetails } from "../controllers/api/UserController.js";
import express from "express";
const router=express.Router();

router.get("/user",verifyToken,userDetails);
router.post("/identity",indentity);

export default router;