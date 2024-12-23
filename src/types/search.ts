import { API_RESPONSE } from "./interfaces";
import { ProductWithCategoryAndVariants } from "./products";

export interface QuerySearch {
  categoryId?: string;
  limit?: number;
  offset?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
}
export interface QueryPagination {
  categorySlug?: string;
  limit?: number;
  offset?: number;
  cursor?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
}

export interface SearchResponse extends API_RESPONSE {
  data: ProductWithCategoryAndVariants[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
