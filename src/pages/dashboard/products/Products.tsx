"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductData } from "@/types/product";
import { HandleOtherProduct } from "../../../features/components/dialog/product/HandleOtherProduct";
import { useGetAllProduct } from "@/features/api/products/product.query";
import { Link } from "react-router-dom";

export function ProductsSectionDashboard() {
  const { data, isLoading, error } = useGetAllProduct();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        Error loading products: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">No products found</div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((product: ProductData) => (
        <Card key={product.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <p className="place-content-center">{product.name}</p>
              <HandleOtherProduct
                initialData={{
                  categoryId: product.categoryId,
                  description: product.description,
                  name: product.name,
                  price: product.price,
                  id: product.id,
                }}
              />
            </CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Price:</span>
                <span>{product.price} IDR</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">SKU:</span>
                <span>{product.sku}</span>
              </div>
              <div className="pt-2  flex justify-between">
                <Link to={`/dashboard/product/${product.id}`}>
                  <Button>More Variants</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
