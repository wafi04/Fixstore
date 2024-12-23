import { ProductData } from "./product";
import { VariantsData } from "./variants";

export interface CartDto {
  variantId: string;
  subTotal: number;
  size: string;
  quantity: number;
}

export type CartData = {
  id: string;
  userId: string;
  total: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
};

export interface Variants extends VariantsData {
  sku: string;
}

export type CartItem = {
  id: string;
  cartId: string;
  variantId: string;
  size: string;
  subTotal: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  variant: Variants;
};
