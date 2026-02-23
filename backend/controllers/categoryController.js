import CategoryModel from "../models/catagoryModel.js";
import ProductModel from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });

export const createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const slug = slugify(name);
    const existing = await CategoryModel.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: "Category slug already exists" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result?.secure_url || "";
    }

    const category = await CategoryModel.create({
      name,
      slug,
      description,
      image: imageUrl,
      isActive: isActive ?? true,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (_req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name && name !== category.name) {
      const slug = slugify(name);
      const existing = await CategoryModel.findOne({ slug, _id: { $ne: category._id } });
      if (existing) {
        return res.status(409).json({ message: "Category slug already exists" });
      }
      category.name = name;
      category.slug = slug;
    }

    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      category.image = result?.secure_url || category.image;
    }

    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.deleteOne();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await CategoryModel.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const products = await ProductModel.find({ category: category._id }).populate(
      "category",
      "name slug image description"
    );
    res.json({ category, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
