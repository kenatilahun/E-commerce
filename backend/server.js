import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"; 
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config()

const app=express();
const PORT=process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(cors({
  origin: process.env.FRONTEND_URL || true, // frontend URL
  credentials: true, // required for cookies
}));          //allow frontend requests





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_db"); 


// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   category: String
// });
// const Product = mongoose.model("Product", productSchema, "products");

// app.get("/", (req, res) => {
  
//   res.send("Backend is running");  })
//  app.get("/products", async (req, res) => {
//   try {const kena=req.query.keyword|| "";
//     const products = await Product.find({
//   name: {$regex: kena , $options: "i"}
// });

//     res.json(products);
//   } catch (err) { 
//     res.status(500).json({ message: err.message });
//   }
// });


app.use("/api/users",authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/banners", bannerRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT); 


// app.get("/test-db", async (req, res) => {
//   const product = await ProductModel.create({
//     name: "Compass Testj",
//     price: 99,
//     category: "test",
//     image: "test.jpg",
//   });
//   res.json(product);
// });
