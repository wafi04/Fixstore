import { Card, CardContent } from "@/components/ui/card";
import { FormatPrice } from "@/utils/FormatPrice";

export function CartProcessed({ total }: { total: number }) {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{FormatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{FormatPrice(total)}</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white rounded-lg py-3 mt-6 hover:bg-gray-800 transition-colors">
            Proceed to Checkout
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
