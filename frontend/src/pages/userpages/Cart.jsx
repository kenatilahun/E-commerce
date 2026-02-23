import React, { useMemo } from "react";
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

  const items = useMemo(() => {
    if (userInfo) return cart?.items || [];
    return guestItems;
  }, [userInfo, cart, guestItems]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.priceSnapshot ?? item.price ?? 0;
      return sum + price * item.qty;
    }, 0);
  }, [items]);

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

  if (userInfo && isLoading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading cart...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Your cart</h1>
          <p className="mt-1 text-sm text-slate-500">Review items before checkout.</p>
        </div>
        <Link to="/categories" className="text-sm font-semibold text-slate-700 hover:underline">
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <div className="text-sm text-slate-500">Your cart is empty.</div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => {
              const name = item.nameSnapshot || item.name || item.product?.name || "Product";
              const image = item.imageSnapshot || item.image || item.product?.image || "";
              const price = item.priceSnapshot ?? item.price ?? item.product?.price ?? 0;
              const variant = item.variantLabel || "";

              return (
                <div
                  key={item._id || `${item.productId}-${item.variantId || ""}`}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
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
                    <div className="mt-1 text-sm font-semibold text-slate-900">${price}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item, item.qty - 1)}
                      className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-slate-800">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item, item.qty + 1)}
                      className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    disabled={isRemoving || isUpdating}
                    className="text-xs font-semibold text-rose-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Order summary</div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm"
            >
              Checkout (coming soon)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
