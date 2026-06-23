import express from "express";
import { createOrder, listOrders, myOrders, updateOrderStatus } from "../controllers/orderController.js";
import { requireAdminPortal, requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.post("/", createOrder);
router.get("/mine", myOrders);
router.get("/", requireRole("admin"), requireAdminPortal, listOrders);
router.patch("/:id/status", requireRole("admin"), requireAdminPortal, updateOrderStatus);

export default router;
