import express from 'express';
// import { protect, admin } from '../middleware/authmiddleware.js';

import { createProduct, getProducts, getProductsByCategory } from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js';
// routes/categoryRoutes.js


const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
// router.post('/upload', protect, admin, upload.single('image'), createProduct);
router.post('/production', upload.single("image"),createProduct);
export default router;

