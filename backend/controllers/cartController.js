import CartModel from "../models/cartModel.js";
import ProductModel from "../models/productModel.js";

const normalizeQty = (value) => {
  const qty = Number(value);
  if (Number.isNaN(qty) || qty < 1) return 1;
  return Math.floor(qty);
};

const resolveVariant = (product, variantId) => {
  if (!product?.variants?.length) {
    return {
      variantId: null,
      variantLabel: "",
      price: product.price,
      stock:
        typeof product.countInStock === "number"
          ? product.countInStock
          : Number.MAX_SAFE_INTEGER,
    };
  }

  if (!variantId) {
    return { error: "Variant is required" };
  }

  const variant = product.variants.id(variantId);
  if (!variant) {
    return { error: "Invalid variant" };
  }

  const price = variant.price ?? product.price;
  const stock =
    typeof variant.countInStock === "number"
      ? variant.countInStock
      : Number.MAX_SAFE_INTEGER;
  const variantLabel = `${variant.name}: ${variant.value}`;

  return {
    variantId: variant._id,
    variantLabel,
    price,
    stock,
  };
};

const loadCart = async (userId) => {
  return CartModel.findOne({ user: userId }).populate(
    "items.product",
    "name price image variants countInStock"
  );
};

export const getCart = async (req, res) => {
  try {
    let cart = await loadCart(req.user._id);
    if (!cart) {
      cart = await CartModel.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addCartItem = async (req, res) => {
  try {
    const { productId, qty, variantId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product is required" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const variantInfo = resolveVariant(product, variantId);
    if (variantInfo.error) {
      return res.status(400).json({ message: variantInfo.error });
    }

    const requestedQty = normalizeQty(qty);
    if (variantInfo.stock < requestedQty) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) {
      cart = await CartModel.create({ user: req.user._id, items: [] });
    }

    const existing = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        String(item.variantId || "") === String(variantInfo.variantId || "")
    );

    if (existing) {
      const newQty = existing.qty + requestedQty;
      if (variantInfo.stock < newQty) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      existing.qty = newQty;
    } else {
      cart.items.push({
        product: product._id,
        variantId: variantInfo.variantId,
        variantLabel: variantInfo.variantLabel,
        qty: requestedQty,
        priceSnapshot: variantInfo.price,
        nameSnapshot: product.name,
        imageSnapshot: product.image || "",
      });
    }

    await cart.save();
    const populated = await loadCart(req.user._id);
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { qty, variantId } = req.body;

    const cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = await ProductModel.findById(item.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const variantInfo = resolveVariant(product, variantId || item.variantId);
    if (variantInfo.error) {
      return res.status(400).json({ message: variantInfo.error });
    }

    const requestedQty = normalizeQty(qty ?? item.qty);
    if (variantInfo.stock < requestedQty) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    item.variantId = variantInfo.variantId;
    item.variantLabel = variantInfo.variantLabel;
    item.qty = requestedQty;
    item.priceSnapshot = variantInfo.price;
    item.nameSnapshot = product.name;
    item.imageSnapshot = product.image || "";

    await cart.save();
    const populated = await loadCart(req.user._id);
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.deleteOne();
    await cart.save();
    const populated = await loadCart(req.user._id);
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const mergeCart = async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    let cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) {
      cart = await CartModel.create({ user: req.user._id, items: [] });
    }

    for (const item of items) {
      const productId = item.productId || item.product;
      if (!productId) {
        continue;
      }

      const product = await ProductModel.findById(productId);
      if (!product) {
        continue;
      }

      const variantInfo = resolveVariant(product, item.variantId);
      if (variantInfo.error) {
        continue;
      }

      const requestedQty = normalizeQty(item.qty);
      if (variantInfo.stock < requestedQty) {
        continue;
      }

      const existing = cart.items.find(
        (cartItem) =>
          cartItem.product.toString() === productId &&
          String(cartItem.variantId || "") === String(variantInfo.variantId || "")
      );

      if (existing) {
        const newQty = existing.qty + requestedQty;
        existing.qty = Math.min(newQty, variantInfo.stock);
      } else {
        cart.items.push({
          product: product._id,
          variantId: variantInfo.variantId,
          variantLabel: variantInfo.variantLabel,
          qty: requestedQty,
          priceSnapshot: variantInfo.price,
          nameSnapshot: product.name,
          imageSnapshot: product.image || "",
        });
      }
    }

    await cart.save();
    const populated = await loadCart(req.user._id);
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
