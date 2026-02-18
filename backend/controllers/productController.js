import ProductModel from "../models/productModel.js";

import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    console.log("FILE:", req.file)
    const { name, price, category} = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) throw error;
          imageUrl = result.secure_url;
        }
      );

      result.end(req.file.buffer);
    }

    const product = await ProductModel.create({
      name,
      price, 
      category,
      image: imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await ProductModel.find({ category });
		res.json({ products });
	} catch (error) {
    console.log(req.file);
console.log(req.body);

		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};