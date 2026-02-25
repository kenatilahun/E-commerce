import express from "express";
import { login, logoutUser, register, refreshToken, requestPasswordReset, resetPassword, getProfile, updatePassword, makeAdmin, listUsers } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authmiddleware.js";
import { authLimiter, loginLimiter } from "../middleware/rateLimit.js";

const router = express.Router();
router.post("/register", authLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/logout", authLimiter, logoutUser);
router.post("/refresh", authLimiter, refreshToken);
router.post("/password-reset/request", authLimiter, requestPasswordReset);
router.post("/password-reset/confirm", authLimiter, resetPassword);
router.get("/me", protect, getProfile);
router.post("/update-password", protect, updatePassword);
router.get("/", protect, admin, listUsers);
router.post("/:id/make-admin", protect, admin, makeAdmin);

export default router;
