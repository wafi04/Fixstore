export interface CategoryForm {
  id?: string;
  name: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  parentId?: string;
  image: string | null | File;
}

export type CategoryUpdate = Partial<CategoryForm>;

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  depth: number;
  parentId: string | null;
  metaTitle?: string;
  metaDescription?: string;
  image: string | null;
  children: CategoryData[];
}
