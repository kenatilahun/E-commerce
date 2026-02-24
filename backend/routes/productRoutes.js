import express from 'express';
import { protect, admin } from '../middleware/authmiddleware.js';

import { createProduct, deleteProduct, getProductById, getProducts, getProductsByCategory, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js';
// routes/categoryRoutes.js


const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);
// router.post('/upload', protect, admin, upload.single('image'), createProduct);
router.post('/production', protect, admin, upload.single("image"),createProduct);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
export default router;

