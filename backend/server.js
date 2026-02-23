import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; 
import dotenv from "dotenv";
import protect from "./middleware/authmiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import ProductModel from "./models/productModel.js";
dotenv.config()

const app=express();
const PORT=5000;
app.use(cors({
  origin: true, // frontend URL
  credentials: true, // required for cookies
}));          //allow frontend requests





app.use(express.json());
 mongoose.connect("mongodb://127.0.0.1:27017/mern_db"); 


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
