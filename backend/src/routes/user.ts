import express from "express";
import { verifyToken } from "../middleware/auth";
import { getCurrentUser } from "../controllers/user";

const router = express.Router();

router.get("/me", verifyToken, getCurrentUser);

export default router;
