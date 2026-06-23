import express from "express";
import { dashboard, listUsers, updateUserStatus } from "../controllers/adminController.js";
import { requireAdminPortal, requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth, requireRole("admin"), requireAdminPortal);
router.get("/dashboard", dashboard);
router.get("/users", listUsers);
router.patch("/users/:id/status", updateUserStatus);

export default router;
