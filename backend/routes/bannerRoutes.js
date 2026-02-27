import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { admin, protect } from "../middleware/authmiddleware.js";
import {
  createBanner,
  deleteBanner,
  getActiveBanners,
  getBanners,
  updateBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

router.get("/public", getActiveBanners);
router.get("/", protect, admin, getBanners);
router.post("/", protect, admin, upload.single("image"), createBanner);
router.put("/:id", protect, admin, upload.single("image"), updateBanner);
router.delete("/:id", protect, admin, deleteBanner);

export default router;
