import { createSlice } from "@reduxjs/toolkit";

const loadItems = () => {
  const raw = localStorage.getItem("cartItems");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveItems = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const initialState = {
  items: loadItems(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload;
      const existing = state.items.find(
        (item) =>
          item.productId === incoming.productId &&
          String(item.variantId || "") === String(incoming.variantId || "")
      );

      if (existing) {
        existing.qty += incoming.qty;
      } else {
        state.items.push(incoming);
      }
      saveItems(state.items);
    },
    updateItemQty: (state, action) => {
      const { productId, variantId, qty } = action.payload;
      const item = state.items.find(
        (entry) =>
          entry.productId === productId &&
          String(entry.variantId || "") === String(variantId || "")
      );
      if (item) {
        item.qty = qty;
        saveItems(state.items);
      }
    },
    removeItem: (state, action) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.filter(
        (entry) =>
          entry.productId !== productId ||
          String(entry.variantId || "") !== String(variantId || "")
      );
      saveItems(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveItems([]);
    },
    setCart: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      saveItems(state.items);
    },
  },
});

export const { addItem, updateItemQty, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
