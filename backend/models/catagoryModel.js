import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   lowercase: true,
    // },
    description: {
      type: String,
    },
    image: {
      type: String, // URL or path
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CategoryModel= mongoose.model("Category", categorySchema);

export default CategoryModel;
