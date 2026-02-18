// import CategoryModel from "../models/catagoryModel.js";

//  export const getCategories = async(req, res) => {
//  try {
//   const categories = await CategoryModel.find().select("name slug icon");
//   res.json(categories);
// }catch (error) {
// 		console.log("Error in getProductsByCategory controller", error.message);
// 		res.status(500).json({ message: "Server error", error: error.message });
// 	}
//  };


// Additional CRUD operations can be added here as needed
// GET all categories (for navbar & sidebar)