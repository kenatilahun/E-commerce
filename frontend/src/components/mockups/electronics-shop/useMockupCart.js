import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddCartItemMutation, useGetCartQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from "../../../redux/ApiSlices/cartApiSlice";
import { addItem as addGuestItem, removeItem as removeGuestItem, updateItemQty as updateGuestQty } from "../../../redux/featureSlices/cartSlice";

const getSnapshotPrice = (item) => item.priceSnapshot ?? item.price ?? item.product?.price ?? 0;
const getSnapshotName = (item) => item.nameSnapshot || item.name || item.product?.name || "Product";
const getSnapshotImage = (item) => item.imageSnapshot || item.image || item.product?.image || "";

export function useMockupCartState() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const guestItems = useSelector((state) => state.cart.items);
  const { data: cart, isFetching } = useGetCartQuery(undefined, {
    skip: !userInfo,
  });

  const items = useMemo(() => (userInfo ? cart?.items || [] : guestItems), [userInfo, cart, guestItems]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + Number(item.qty || 0), 0), [items]);

  return {
    userInfo,
    items,
    itemCount,
    isFetching,
  };
}

export function useMockupCartActions() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [addCartItem, addCartMeta] = useAddCartItemMutation();
  const [updateCartItem, updateCartMeta] = useUpdateCartItemMutation();
  const [removeCartItem, removeCartMeta] = useRemoveCartItemMutation();

  const addProductToCart = useCallback(
    async (product, options = {}) => {
      const qty = Math.max(1, Number(options.qty || 1));
      const variantId = options.variantId || undefined;

      if (userInfo) {
        await addCartItem({
          productId: product._id,
          qty,
          variantId,
        }).unwrap();
        return;
      }

      dispatch(
        addGuestItem({
          productId: product._id,
          name: product.name,
          image: product.image || "",
          price: Number(product.price || 0),
          qty,
          variantId: variantId || "",
          variantLabel: options.variantLabel || "",
        }),
      );
    },
    [addCartItem, dispatch, userInfo],
  );

  const updateCartQty = useCallback(
    async (item, qty) => {
      const nextQty = Math.max(1, Number(qty || 1));
      if (userInfo) {
        await updateCartItem({
          itemId: item._id,
          qty: nextQty,
          variantId: item.variantId || undefined,
        }).unwrap();
        return;
      }

      dispatch(
        updateGuestQty({
          productId: item.productId,
          variantId: item.variantId,
          qty: nextQty,
        }),
      );
    },
    [dispatch, updateCartItem, userInfo],
  );

  const removeCartLine = useCallback(
    async (item) => {
      if (userInfo) {
        await removeCartItem(item._id).unwrap();
        return;
      }

      dispatch(
        removeGuestItem({
          productId: item.productId,
          variantId: item.variantId,
        }),
      );
    },
    [dispatch, removeCartItem, userInfo],
  );

  return {
    addProductToCart,
    updateCartQty,
    removeCartLine,
    isAdding: addCartMeta.isLoading,
    isUpdating: updateCartMeta.isLoading,
    isRemoving: removeCartMeta.isLoading,
  };
}

export function mapCartItemForMockup(item) {
  return {
    id: item._id || `${item.productId}-${item.variantId || "default"}`,
    productId: item.productId || item.product?._id,
    name: getSnapshotName(item),
    img: getSnapshotImage(item),
    price: Number(getSnapshotPrice(item)),
    quantity: Number(item.qty || 1),
    specs: item.variantLabel || `${item.product?.category?.name || "Electronics"}`,
    raw: item,
  };
}
