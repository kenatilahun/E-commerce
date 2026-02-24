import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    countInStock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    default: "",
    trim: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  image: {
    type: String, // Cloudinary or local URL
    required: false,
  },

  countInStock: {
    type: Number,
    default: 0,
    min: 0,
  },

  variants: {
    type: [variantSchema],
    default: [],
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  isRecommended: {
    type: Boolean,
    default: false,
  },

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
}, { timestamps: true });

const ProductModel= mongoose.model("products", productSchema);

export default ProductModel;
