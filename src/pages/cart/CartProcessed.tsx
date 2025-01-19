import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormatPrice } from "@/utils/FormatPrice";
import { useEffect, useState } from "react";
import { Api } from "@/utils/api";
import { API_RESPONSE } from "@/types/interfaces";
import { CartProcessedProps, PaymentResponse } from "@/types/payment";

export function CartProcessed({ total, customerDetails }: CartProcessedProps) {
  const [isLoading, setIsLoading] = useState(false);
  const api = new Api();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";

    script.setAttribute("data-client-key", "SB-Mid-client-YJq2zie-zRbT6apz");
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://app.sandbox.midtrans.com/snap/snap.js"]'
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const orderId = `ORDER-${Date.now()}`;
      const paymentData = {
        orderId,
        amount: total,
        customerDetails: customerDetails || {
          name: "Guest",
          email: "guest@example.com",
          phone: "08123456789",
        },
        itemDetails: [
          {
            id: orderId,
            price: total,
            quantity: 1,
            name: `Order ${orderId}`,
          },
        ],
      };

      const response = await api.post<API_RESPONSE<PaymentResponse>>(
        "/payment/charge",
        paymentData
      );
      const token = response.data.data.data.token;

      // Open Midtrans popup
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: (result) => {
            console.log("Payment success:", result.data);
          },
          onPending: (result) => {
            console.log("Payment pending:", result.data);
          },
          onError: (result) => {
            console.error("Payment error:", result.data);
          },
          onClose: () => {
            console.log("Customer closed the popup without finishing payment");
          },
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

          <Button
            className="w-full mt-4"
            onClick={handleCheckout}
            disabled={isLoading}>
            {isLoading ? "Processing..." : "Checkout"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
