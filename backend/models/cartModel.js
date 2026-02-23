import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    variantLabel: {
      type: String,
      default: "",
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    priceSnapshot: {
      type: Number,
      required: true,
    },
    nameSnapshot: {
      type: String,
      required: true,
    },
    imageSnapshot: {
      type: String,
      default: "",
    },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;
