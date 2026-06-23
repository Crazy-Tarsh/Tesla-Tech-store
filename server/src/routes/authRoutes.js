import express from "express";
import { getMe, login, logout, register, updateProfile } from "../controllers/authController.js";
import { authLimiter } from "../middleware/security.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, updateProfile);

export default router;
