import { CategoryForm } from "./categories";
import { VariantsData } from "./variants";

export interface ProductForm {
  id?: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
}

export interface ProductData {
  category: CategoryForm;
  categoryId: string;
  subTitle: string | null;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  price: number;
  sku: string;
  updatedAt: string | null;
}

export interface ProductDetails extends ProductData {
  variants: VariantsData[];
}
