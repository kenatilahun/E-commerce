import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, admin } from "../middleware/authmiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getProductsByCategorySlug,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/slug/:slug/products", getProductsByCategorySlug);
router.get("/:id", getCategoryById);
router.post("/", protect, admin, upload.single("image"), createCategory);
router.put("/:id", protect, admin, upload.single("image"), updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
