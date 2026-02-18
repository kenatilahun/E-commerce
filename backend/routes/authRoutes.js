import express from "express";
import {login,logoutUser} from "../controllers/authController.js"
import protect from "../middleware/authmiddleware.js"
const router=express.Router();
// router.post("/register",register);
router.post("/login",login);
router.post("/logout",logoutUser);
// router.get("/profile",protect,profile);
export default router