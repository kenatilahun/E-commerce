import cloudinary from "../config/cloudinary.js";
import BannerModel from "../models/bannerModel.js";

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "banners" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });

const toNullableDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const createBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle = "",
      link = "",
      position,
      isActive = true,
      sortOrder = 0,
      startDate,
      endDate,
    } = req.body;

    if (!title || !position) {
      return res.status(400).json({ message: "Title and position are required" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result?.secure_url || "";
    }

    const banner = await BannerModel.create({
      title,
      subtitle,
      link,
      position,
      image: imageUrl,
      isActive: isActive === "true" || isActive === true,
      sortOrder: Number(sortOrder) || 0,
      startDate: toNullableDate(startDate),
      endDate: toNullableDate(endDate),
    });

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBanners = async (req, res) => {
  try {
    const filter = {};
    if (req.query.position) {
      filter.position = req.query.position;
    }

    const banners = await BannerModel.find(filter).sort({ position: 1, sortOrder: 1, createdAt: -1 });
    res.json({ banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActiveBanners = async (req, res) => {
  try {
    const now = new Date();
    const filter = {
      isActive: true,
      $and: [
        { $or: [{ startDate: null }, { startDate: { $lte: now } }] },
        { $or: [{ endDate: null }, { endDate: { $gte: now } }] },
      ],
    };

    if (req.query.position) {
      filter.position = req.query.position;
    }

    const banners = await BannerModel.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    res.json({ banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await BannerModel.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const {
      title,
      subtitle,
      link,
      position,
      isActive,
      sortOrder,
      startDate,
      endDate,
    } = req.body;

    if (title !== undefined) banner.title = title;
    if (subtitle !== undefined) banner.subtitle = subtitle;
    if (link !== undefined) banner.link = link;
    if (position !== undefined) banner.position = position;
    if (isActive !== undefined) banner.isActive = isActive === "true" || isActive === true;
    if (sortOrder !== undefined) banner.sortOrder = Number(sortOrder) || 0;
    if (startDate !== undefined) banner.startDate = toNullableDate(startDate);
    if (endDate !== undefined) banner.endDate = toNullableDate(endDate);

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      banner.image = result?.secure_url || banner.image;
    }

    const updated = await banner.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await BannerModel.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    await banner.deleteOne();
    res.json({ message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
