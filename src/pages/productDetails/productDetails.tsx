"use client";
import { useState, useEffect } from "react";
import { GetProductById } from "@/features/api/products/product.query";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormatPrice } from "@/utils/FormatPrice";
import { useCart } from "@/hooks/cart/useCart";
import { VariantsData } from "@/types/variants";
import { useParams } from "react-router-dom";
import { ModalAddToCart } from "@/features/components/dialog/cart/DialogCart";

export function ProductDetailsPage() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = GetProductById(id as string);
  const { setPrice, setSize, size } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<
    VariantsData | undefined
  >();

  useEffect(() => {
    if (data && data.variants.length > 0) {
      setSelectedVariant(data.variants[0]);
    }
  }, [data]);

  if (isLoading || data === undefined) {
    return (
      <div className="min-h-screen flex w-full justify-center items-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  const handleAddToCart = () => {
    setPrice(data.price);
    setIsOpen(true);
  };

  const mainImage = selectedVariant?.image[0].url;

  return (
    <>
      <section className=" container  mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <Card className="overflow-hidden bg-gray-50">
              <CardContent className="p-0">
                <img
                  src={mainImage as string}
                  alt={data.name}
                  width={500}
                  height={500}
                  className="w-full  object-cover aspect-square"
                />
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
              <p className="mt-2 text-gray-500">{data.description}</p>
            </div>

            {/* Variant Images */}
            <div className="">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Available Colors
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {data.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative rounded-lg overflow-hidden border-2 ${
                      selectedVariant?.id === variant.id
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}>
                    <img
                      src={variant.image[0].url}
                      alt={variant.color}
                      width={100}
                      height={100}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">
                {FormatPrice(data.price)}
              </h2>
              <p className="mt-2 text-sm text-gray-500">SKU: {data.sku}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="flex space-x-2 mt-2">
                {selectedVariant?.inventory.map((inv) => (
                  <button
                    key={inv.id}
                    disabled={inv.availableStock === 0}
                    onClick={() => setSize(inv.size)}
                    className={`px-3 py-1 rounded-lg ${
                      size === inv.size && "bg-gray-500 text-white"
                    }`}>
                    {inv.size} {inv.availableStock === 0 && "(Out of Stock)"}
                  </button>
                ))}
              </div>
            </div>

            <div className=" border-t border-gray-200">
              <div className="flex space-x-4">
                <div className="flex-1 h-12 relative overflow-hidden">
                  <Button
                    className="w-full h-full group overflow-hidden relative"
                    onClick={handleAddToCart}>
                    <p className="absolute flex items-center space-x-4 justify-center w-full transition-transform duration-300 transform group-hover:-translate-x-full">
                      <ShoppingCart className="" />
                      <span className="">Add to Cart</span>
                    </p>
                    <p className="absolute flex items-center justify-center w-full transition-transform duration-300 transform translate-x-full group-hover:translate-x-0">
                      Buy Now!
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalAddToCart
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={data}
        selectedVariant={selectedVariant}
      />
    </>
  );
}

export default ProductDetailsPage;
