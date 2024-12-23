import { ProductData } from "./product";

export interface VariantsForm {
  color: string;
  productId: string;
  images: File[];
  inventory: InventoryForm[];
}

export interface InventoryForm {
  size: string;
  stock: number;
  availableStock: number;
  id?: string;
  variantId: string;
}

export interface VariantImage {
  id: string;
  url: string;
  isMain: boolean;
  variantId: string;
}
export interface VariantsData {
  id: string;
  color: string;
  image: VariantImage[];
  product: ProductData;
  inventory: InventoryForm[];
}
