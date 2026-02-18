import express from 'express';
// import { protect, admin } from '../middleware/authmiddleware.js';

import { createProduct} from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js';
// routes/categoryRoutes.js


const router = express.Router();

// router.get("/category", getCategories);
// router.get("/category/:slug", getProductsByCategory);
// router.post('/upload', protect, admin, upload.single('image'), createProduct);
router.post('/production', upload.single("image"),createProduct);
export default router;

