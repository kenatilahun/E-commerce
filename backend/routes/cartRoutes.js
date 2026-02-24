import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import {
  addCartItem,
  getCart,
  mergeCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/items", protect, addCartItem);
router.patch("/items/:itemId", protect, updateCartItem);
router.delete("/items/:itemId", protect, removeCartItem);
router.post("/merge", protect, mergeCart);

export default router;
