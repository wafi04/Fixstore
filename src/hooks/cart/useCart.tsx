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
  updateItemQuantity: (id: string, quantity: number) => void;
}

export const useCart = create<CartState>((set, get) => ({
  count: 0,
  total: 0,
  price: 0,
  size: "",
  items: [],

  updateItemQuantity: (id: string, quantity: number) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              subTotal: (item.variant.product.price || 0) * quantity,
            }
          : item
      );

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.subTotal,
        0
      );

      return {
        items: updatedItems,
        total: newTotal,
        count: quantity,
        price: state.price,
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
