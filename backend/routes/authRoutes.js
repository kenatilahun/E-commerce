import express from "express";
import {login,logoutUser,register,refreshToken} from "../controllers/authController.js"
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logoutUser);
router.post("/refresh",refreshToken);
// router.get("/profile",protect,profile);
export default router
