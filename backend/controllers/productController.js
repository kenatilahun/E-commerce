import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/catagoryModel.js";

import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });

export const createProduct = async (req, res) => {
  try {
    console.log("FILE:", req.file)
    const { name, price, category, isFeatured, isRecommended } = req.body;

    let imageUrl = "";

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    imageUrl = result?.secure_url || "";
    if (!imageUrl) {
      return res.status(500).json({ message: "Cloudinary did not return image URL" });
    }

    const categoryDoc = await CategoryModel.findOne({
      $or: [{ _id: category }, { slug: category }, { name: category }],
    });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const product = await ProductModel.create({
      name,
      price, 
      category: categoryDoc._id,
      image: imageUrl,
      isFeatured: isFeatured === "true" || isFeatured === true,
      isRecommended: isRecommended === "true" || isRecommended === true,
    });

    res.status(201).json({ product, imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const categoryDoc = await CategoryModel.findOne({
      $or: [{ _id: category }, { slug: category }, { name: category }],
    });
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }
		const products = await ProductModel.find({ category: categoryDoc._id }).populate("category", "name slug image description");
		res.json({ category: categoryDoc, products });
	} catch (error) {
    console.log(req.file);
console.log(req.body);

		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim();
    const filter = keyword
      ? { name: { $regex: keyword, $options: "i" } }
      : {};

    const products = await ProductModel.find(filter).populate(
      "category",
      "name slug image description"
    );

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category",
      "name slug image description"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
