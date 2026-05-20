import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../redux/ApiSlices/cartApiSlice";
import { removeItem, updateItemQty } from "../../redux/featureSlices/cartSlice";

const Cart = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const guestItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const { data: cart, isLoading } = useGetCartQuery(undefined, {
    skip: !userInfo,
  });
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();
  const [removingKey, setRemovingKey] = useState("");

  const items = useMemo(() => {
    if (userInfo) return cart?.items || [];
    return guestItems;
  }, [userInfo, cart, guestItems]);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + (item.qty || 0), 0), [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.priceSnapshot ?? item.price ?? 0;
      return sum + price * item.qty;
    }, 0);
  }, [items]);

  const shipping = subtotal >= 50 ? 0 : 8.99;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleQtyChange = async (item, qty) => {
    if (qty < 1) return;

    if (userInfo) {
      await updateCartItem({ itemId: item._id, qty });
      return;
    }

    dispatch(
      updateItemQty({
        productId: item.productId,
        variantId: item.variantId,
        qty,
      })
    );
  };

  const handleRemove = async (item) => {
    const key = item._id || `${item.productId}-${item.variantId || ""}`;
    setRemovingKey(key);

    const removeAction = async () => {
      if (userInfo) {
        await removeCartItem(item._id);
        return;
      }
      dispatch(
        removeItem({
          productId: item.productId,
          variantId: item.variantId,
        })
      );
    };

    setTimeout(removeAction, 180);
  };

  if (userInfo && isLoading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading cart...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Shopping Cart</h1>
          <p className="mt-2 text-sm text-slate-500">{itemCount} items</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="text-sm text-slate-500">Your cart is empty</div>
          <Link
            to="/categories"
            className="mt-4 inline-flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2.2fr_1fr]">
          <div>
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <Link to="/categories" className="font-semibold text-slate-700 hover:underline">
                Continue Shopping
              </Link>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                Free shipping over $50
              </span>
            </div>

            <div className="space-y-4">
              {items.map((item) => {
                const name = item.nameSnapshot || item.name || item.product?.name || "Product";
                const image = item.imageSnapshot || item.image || item.product?.image || "";
                const price = item.priceSnapshot ?? item.price ?? item.product?.price ?? 0;
                const variant = item.variantLabel || "";
                const key = item._id || `${item.productId}-${item.variantId || ""}`;
                const isRemovingRow = removingKey === key;

                return (
                  <div
                    key={key}
                    className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 sm:flex-row sm:items-center ${
                      isRemovingRow ? "opacity-0 -translate-y-1" : "opacity-100"
                    }`}
                  >
                    <div className="h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      {image ? (
                        <img src={image} alt={name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No image</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900">{name}</div>
                      {variant && <div className="text-xs text-slate-500">{variant}</div>}
                      <div className="mt-2 text-sm text-slate-500">${Number(price).toFixed(2)} each</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item, item.qty - 1)}
                          className="h-8 w-8 rounded-full text-slate-700 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item, item.qty + 1)}
                          className="h-8 w-8 rounded-full text-slate-700 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">
                      ${(Number(price) * item.qty).toFixed(2)}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      disabled={isRemoving || isUpdating}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-slate-300"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <div className="text-sm font-semibold text-slate-900">Order Summary</div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span className="font-semibold text-slate-900">-${discount.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-semibold text-slate-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
              Free shipping over $50
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
              />
              <button className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:border-blue-300">
                Apply
              </button>
            </div>

            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
