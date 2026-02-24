import express from "express";
import {login,logoutUser,register,refreshToken,verifyEmail,requestPasswordReset,resetPassword,getProfile,updatePassword} from "../controllers/authController.js"
import { protect } from "../middleware/authmiddleware.js"
import { authLimiter, loginLimiter } from "../middleware/rateLimit.js"
const router=express.Router();
router.post("/register", authLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/logout", authLimiter, logoutUser);
router.post("/refresh", authLimiter, refreshToken);
router.get("/verify-email", verifyEmail);
router.post("/password-reset/request", authLimiter, requestPasswordReset);
router.post("/password-reset/confirm", authLimiter, resetPassword);
router.get("/me", protect, getProfile);
router.post("/update-password", protect, updatePassword);
export default router
