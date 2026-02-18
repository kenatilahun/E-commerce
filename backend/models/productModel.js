import mongoose from "mongoose";

const productSchema =new mongoose.Schema({

    name: {
      type: String,
      required: true,
      trim: true,
    },

    

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    // image: {
    //   type: String, // Cloudinary or local URL
    //   required: false,
    // },

    // category: {
    // type: String,
    //   // type: mongoose.Schema.Types.ObjectId,
    //   // ref: "CategoryModel",
    //   required: true,
    // },

    // brand: {
    //   type: String,
    // },

    // countInStock: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },

    // rating: {
    //   type: Number,
    //   default: 0,
    // },

    // numReviews: {
    //   type: Number,
    //   default: 0,
    // },

  //   isFeatured: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  // { timestamps: true }
   }
  )

const ProductModel= mongoose.model("products", productSchema);

export default ProductModel;
