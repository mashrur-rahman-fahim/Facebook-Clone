import { verifyToken } from "../controllers/auth/TokenController.js";
import { indentity, userDetails } from "../controllers/api/UserController.js";
import express from "express";
import { createPost } from "../controllers/api/PostController.js";
const router=express.Router();

router.get("/user",verifyToken,userDetails);
router.post("/identity",indentity);
router.post("/create-post",verifyToken,createPost);
export default router;