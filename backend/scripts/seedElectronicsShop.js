import mongoose from "mongoose";
import dotenv from "dotenv";
import CategoryModel from "../models/catagoryModel.js";
import ProductModel from "../models/productModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_db";

const categories = [
  {
    name: "Laptops",
    slug: "laptops",
    description: "Premium notebooks, ultrabooks, and pro laptops.",
    image: "",
    isActive: true,
  },
  {
    name: "Phones",
    slug: "phones",
    description: "Flagship smartphones and mobile devices.",
    image: "",
    isActive: true,
  },
  {
    name: "Audio",
    slug: "audio",
    description: "Headphones, earbuds, and premium listening gear.",
    image: "",
    isActive: true,
  },
  {
    name: "Gaming",
    slug: "gaming",
    description: "Gaming laptops and performance-first gear.",
    image: "",
    isActive: true,
  },
  {
    name: "Cameras",
    slug: "cameras",
    description: "Camera gear and imaging essentials.",
    image: "",
    isActive: true,
  },
  {
    name: "Displays",
    slug: "displays",
    description: "Monitors and display technology.",
    image: "",
    isActive: true,
  },
];

const productDefinitions = [
  {
    name: 'MacBook Pro 16" M3 Pro',
    brand: "Apple",
    category: "laptops",
    price: 2499,
    originalPrice: 2799,
    rating: 4.9,
    numReviews: 2847,
    countInStock: 24,
    isFeatured: true,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473501/macbook_mfnboc.png",
    description:
      'A flagship pro laptop with a stunning 16-inch display, all-day battery life, and the performance profile the ElectroZone mockup is built around.',
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "audio",
    price: 279,
    originalPrice: 349,
    rating: 4.8,
    numReviews: 5210,
    countInStock: 40,
    isFeatured: true,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473454/headphones_u3da9l.png",
    description:
      "Wireless noise-cancelling headphones with a premium fit, long battery life, and the same hero-card presence shown in the mockup.",
  },
  {
    name: "iPhone 15 Pro 256GB",
    brand: "Apple",
    category: "phones",
    price: 999,
    originalPrice: 1099,
    rating: 4.7,
    numReviews: 9801,
    countInStock: 35,
    isFeatured: true,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473480/iphone_oycerf.png",
    description:
      "A premium smartphone configured to match the mockup merchandising cards, with flagship performance and camera quality.",
  },
  {
    name: "ASUS ROG Strix G16",
    brand: "ASUS",
    category: "gaming",
    price: 1599,
    originalPrice: 1799,
    rating: 4.8,
    numReviews: 1423,
    countInStock: 18,
    isFeatured: true,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473430/gaming-laptop_zhvs7u.png",
    description:
      "A performance-first gaming laptop for the storefront's gaming spotlight, with bold styling and high-end internals.",
  },
  {
    name: 'Samsung Odyssey 34" OLED',
    brand: "Samsung",
    category: "displays",
    price: 799,
    originalPrice: 999,
    rating: 4.6,
    numReviews: 872,
    countInStock: 14,
    isFeatured: true,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473542/monitor_pekzfz.png",
    description:
      "A premium ultrawide OLED display used for the display category and promotional product cards in the mockup.",
  },
  {
    name: "Dell XPS 15 OLED",
    brand: "Dell",
    category: "laptops",
    price: 1899,
    originalPrice: 2199,
    rating: 4.7,
    numReviews: 643,
    countInStock: 16,
    isFeatured: true,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473412/dell-xps_i8npu4.png",
    description:
      "A creator-focused premium laptop that fills the Dell/XPS role across the homepage, listings, and related products.",
  },
  {
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "audio",
    price: 249,
    originalPrice: 279,
    rating: 4.9,
    numReviews: 2140,
    countInStock: 48,
    isFeatured: false,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473393/airpods_ojjw1f.png",
    description:
      "Compact premium earbuds for the related-products and cart recommendations flow.",
  },
  {
    name: 'Apple MacBook Air 15" M3',
    brand: "Apple",
    category: "laptops",
    price: 1299,
    originalPrice: 1399,
    rating: 4.9,
    numReviews: 3102,
    countInStock: 22,
    isFeatured: false,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473501/macbook_mfnboc.png",
    description:
      "A lighter Apple laptop option for product listing depth while preserving the same mockup visual language.",
  },
  {
    name: "Dell Inspiron 15 3000",
    brand: "Dell",
    category: "laptops",
    price: 699,
    originalPrice: 849,
    rating: 4.3,
    numReviews: 2410,
    countInStock: 28,
    isFeatured: false,
    isRecommended: false,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473412/dell-xps_i8npu4.png",
    description:
      "A more affordable Dell laptop to give the listing page realistic price variety.",
  },
  {
    name: "ASUS ZenBook Pro Duo 14",
    brand: "ASUS",
    category: "laptops",
    price: 1899,
    originalPrice: 2199,
    rating: 4.6,
    numReviews: 540,
    countInStock: 12,
    isFeatured: false,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473430/gaming-laptop_zhvs7u.png",
    description:
      "A premium ASUS productivity laptop added for a richer product listing while retaining the mockup styling.",
  },
  {
    name: 'Apple MacBook Pro 14" M3',
    brand: "Apple",
    category: "laptops",
    price: 1999,
    originalPrice: 2199,
    rating: 4.8,
    numReviews: 1876,
    countInStock: 19,
    isFeatured: false,
    isRecommended: true,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473501/macbook_mfnboc.png",
    description:
      "A second Apple pro laptop option to support the listing page and related-product density.",
  },
  {
    name: "Dell XPS 13 Plus OLED",
    brand: "Dell",
    category: "laptops",
    price: 1499,
    originalPrice: 1699,
    rating: 4.6,
    numReviews: 378,
    countInStock: 15,
    isFeatured: false,
    isRecommended: false,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473412/dell-xps_i8npu4.png",
    description:
      "A compact high-end Dell machine that rounds out the premium laptop collection in the storefront.",
  },
  {
    name: "ASUS Vivobook Pro 16 OLED",
    brand: "ASUS",
    category: "laptops",
    price: 1199,
    originalPrice: 1399,
    rating: 4.5,
    numReviews: 290,
    countInStock: 17,
    isFeatured: false,
    isRecommended: false,
    image: "https://res.cloudinary.com/dwfkgnhan/image/upload/v1775473430/gaming-laptop_zhvs7u.png",
    description:
      "An accessible OLED laptop option that keeps the listing page visually full without changing the mockup aesthetic.",
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);

  try {
    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});

    const createdCategories = await CategoryModel.insertMany(categories);
    const categoryMap = new Map(createdCategories.map((category) => [category.slug, category._id]));

    const products = productDefinitions.map((product) => ({
      ...product,
      category: categoryMap.get(product.category),
    }));

    await ProductModel.insertMany(products);

    console.log(`Seeded ${createdCategories.length} categories and ${products.length} products.`);
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
