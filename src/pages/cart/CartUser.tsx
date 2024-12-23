"use client";
import { useGetCart, useRemoveCartItems } from "@/features/api/cart/cart";
import { LayoutsWithHeaderAndFooter } from "@/providers/NavbarAndFooter";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import { FormatPrice } from "@/utils/FormatPrice";
import { CartItem } from "@/types/cart";
import { CartProcessed } from "./CartProcessed";
import { useCart } from "@/hooks/cart/useCart";

export function CartUserPage() {
  const { data } = useGetCart();
  const removeCartItms = useRemoveCartItems();
  console.log(data);
  const { updateItemQuantity, count, total } = useCart();

  const handleCount = (
    type: "decrease" | "increase",
    itemId: string,
    currentQuantity: number
  ) => {
    const newQuantity: number =
      type === "increase"
        ? currentQuantity + 1
        : Math.max(currentQuantity - 1, 0);
    console.log(newQuantity);
    updateItemQuantity(itemId, newQuantity);
  };

  if (!data || !data.items || data.items.length === 0) {
    return (
      <LayoutsWithHeaderAndFooter className="mt-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <ShoppingCart size={48} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-2">Add some items to get started!</p>
        </div>
      </LayoutsWithHeaderAndFooter>
    );
  }

  return (
    <LayoutsWithHeaderAndFooter className="mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {data.items.map((item: CartItem) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={item.variant.image[0].url as string}
                        alt="Product"
                        width={500}
                        height={500}
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.variant.color}
                          </h3>
                          <p className="text-sm text-gray-500">
                            SKU: {item.variant.sku}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Size: {item.size}
                          </p>
                        </div>
                        <button
                          disabled={removeCartItms.isPending}
                          onClick={() => removeCartItms.mutate(item.id)}
                          className="text-red-500 hover:text-red-700">
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              handleCount("decrease", item.id, item.quantity)
                            }
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">
                            -
                          </button>
                          <span>{count}</span>
                          <button
                            onClick={() =>
                              handleCount("increase", item.id, item.quantity)
                            }
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">
                            +
                          </button>
                        </div>
                        <p className="font-semibold">{FormatPrice(total)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <CartProcessed total={data.total} />
        </div>
      </div>
    </LayoutsWithHeaderAndFooter>
  );
}
