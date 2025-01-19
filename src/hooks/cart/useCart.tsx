import { CartItem } from "@/types/cart";
import { create } from "zustand";

interface CartState {
  count: number;
  items: CartItem[];
  total: number;
  price: number;
  increase: () => void;
  decrease: () => void;
  size: string;
  setSize: (size: string) => void;
  setPrice: (price: number) => void;
  reset: () => void;
  updateItemQuantity: (
    itemId: string,
    size: string,
    type: "increase" | "decrease"
  ) => void;
  setInitialItems: (items: CartItem[]) => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (itemId: string, size: string) => number;
}

export const useCart = create<CartState>((set, get) => ({
  count: 0,
  total: 0,
  price: 0,
  size: "",
  items: [],

  getTotalQuantity: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.subTotal, 0);
  },

  getItemQuantity: (itemId: string, size: string) => {
    const state = get();
    const item = state.items.find(
      (item) => item.id === itemId && item.size === size
    );
    return item?.quantity || 0;
  },
  setInitialItems: (items: CartItem[]) =>
    set(() => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.subTotal, 0),
    })),

  updateItemQuantity: (
    itemId: string,
    size: string,
    type: "increase" | "decrease"
  ) =>
    set((state) => {
      const itemToUpdate = state.items.find(
        (item) => item.id === itemId && item.size === size
      );

      if (!itemToUpdate) return state;

      const newQuantity =
        type === "increase"
          ? Math.min(itemToUpdate.quantity + 1, 10)
          : Math.max(itemToUpdate.quantity - 1, 1);

      const updatedItems = state.items.map((item) =>
        item.id === itemId && item.size === size
          ? {
              ...item,
              quantity: newQuantity,
              subTotal: newQuantity * (item.variant.product.price || 0),
            }
          : item
      );

      return {
        items: updatedItems,
      };
    }),

  setSize: (newSize: string) => {
    set((state) => ({
      ...state,
      size: newSize,
    }));
  },

  increase: () => {
    const currentPrice = get().price;
    set((state) => ({
      count: state.count + 1,
      total: (state.count + 1) * currentPrice,
    }));
  },

  decrease: () => {
    const currentPrice = get().price;
    set((state) => ({
      count: state.count > 0 ? state.count - 1 : 0,
      total: state.count > 0 ? (state.count - 1) * currentPrice : 0,
    }));
  },

  setPrice: (price: number) => {
    set((state) => ({
      price,
      total: state.count * price,
    }));
  },

  reset: () => {
    set({
      count: 0,
      total: 0,
      price: 0,
    });
  },
}));
