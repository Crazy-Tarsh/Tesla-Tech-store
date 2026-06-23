import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
  uploadProductImages
} from "../controllers/productController.js";
import { requireAdminPortal, requireAuth, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", listProducts);
router.get("/:slug", getProduct);

router.use(requireAuth, requireRole("admin"), requireAdminPortal);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/uploads/images", upload.array("images", 8), uploadProductImages);

export default router;
