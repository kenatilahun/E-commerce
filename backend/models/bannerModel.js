import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
      trim: true,
    },
    position: {
      type: String,
      required: true,
      enum: [
        "hero_main",
        "hero_side",
        "category_promo",
        "deal_promo",
        "accessory_side",
        "recent_side",
        "summer_left",
        "summer_bottom",
        "bottom_cta",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const BannerModel = mongoose.model("Banner", bannerSchema);

export default BannerModel;
