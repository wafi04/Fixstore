export interface CategoryForm {
  id?: string;
  name: string;
  description: string;
  images: File | null;
}

export type CategoryUpdate = Partial<CategoryData>;

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  depth: number;
  image: string | null;
}
